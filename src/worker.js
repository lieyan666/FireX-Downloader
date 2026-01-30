/**
 * v2rayNG APK Proxy Downloader - Cloudflare Worker
 * 通过 GitHub API 获取 release 信息并代理下载 APK
 */

const GITHUB_API = 'https://api.github.com';
const CACHE_TTL = 300; // 缓存 5 分钟

const ARCH_MAP = {
  arm64: 'arm64-v8a',
  arm: 'armeabi-v7a',
  x86: 'x86',
  x86_64: 'x86_64',
  universal: 'universal',
};

// ─── GitHub API ──────────────────────────────────────────────

async function fetchRelease(repo, type) {
  // latest 可以直接用专用 endpoint，pre-release 需要遍历列表
  const url =
    type === 'pre-release'
      ? `${GITHUB_API}/repos/${repo}/releases`
      : `${GITHUB_API}/repos/${repo}/releases/latest`;

  const resp = await fetch(url, {
    headers: {
      'User-Agent': 'FireX-Downloader',
      Accept: 'application/vnd.github+json',
    },
  });

  if (!resp.ok) {
    throw new Error(`GitHub API 请求失败: ${resp.status}`);
  }

  const data = await resp.json();

  if (type === 'pre-release') {
    const preRelease = data.find((r) => r.prerelease);
    if (!preRelease) throw new Error('未找到 Pre-release 版本');
    return preRelease;
  }

  return data;
}

function findAsset(release, arch) {
  const pattern = ARCH_MAP[arch] || ARCH_MAP.arm64;
  const asset = release.assets.find((a) => {
    const name = a.name.toLowerCase();
    return name.endsWith('.apk') && name.includes(pattern.toLowerCase());
  });
  if (!asset) throw new Error(`未找到架构 ${arch} 对应的 APK 文件`);
  return asset;
}

// ─── 带缓存的请求 ─────────────────────────────────────────────

async function cachedFetchRelease(repo, type) {
  const cacheKey = `https://cache.internal/${repo}/${type}`;
  const cache = caches.default;

  let cached = await cache.match(cacheKey);
  if (cached) {
    return cached.json();
  }

  const release = await fetchRelease(repo, type);

  const resp = new Response(JSON.stringify(release), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': `s-maxage=${CACHE_TTL}`,
    },
  });
  // 写入缓存（不阻塞）
  await cache.put(cacheKey, resp.clone());

  return resp.json();
}

// ─── 路由处理 ──────────────────────────────────────────────────

async function handleInfo(request, repo) {
  const url = new URL(request.url);
  const type = url.searchParams.get('release') || 'latest';
  const arch = url.searchParams.get('arch') || 'arm64';

  const release = await cachedFetchRelease(repo, type);
  const asset = findAsset(release, arch);

  return Response.json({
    version: release.tag_name,
    filename: asset.name,
    size: asset.size,
    downloadUrl: asset.browser_download_url,
    publishedAt: release.published_at,
    prerelease: release.prerelease,
  });
}

async function handleDownload(request, repo) {
  const url = new URL(request.url);
  const type = url.searchParams.get('release') || 'latest';
  const arch = url.searchParams.get('arch') || 'arm64';

  const release = await cachedFetchRelease(repo, type);
  const asset = findAsset(release, arch);

  const resp = await fetch(asset.browser_download_url, {
    headers: { 'User-Agent': 'FireX-Downloader' },
    redirect: 'follow',
  });

  if (!resp.ok) {
    throw new Error(`下载失败: HTTP ${resp.status}`);
  }

  return new Response(resp.body, {
    headers: {
      'Content-Type': 'application/vnd.android.package-archive',
      'Content-Disposition': `attachment; filename="${asset.name}"`,
      'Content-Length': String(asset.size),
      'Access-Control-Allow-Origin': '*',
    },
  });
}

// ─── HTML 页面 ─────────────────────────────────────────────────

function renderPage() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>v2rayNG Downloader</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);
  min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;
}
.card{
  background:rgba(255,255,255,.06);backdrop-filter:blur(16px);
  border:1px solid rgba(255,255,255,.1);border-radius:20px;
  padding:40px;width:100%;max-width:440px;
  box-shadow:0 20px 60px rgba(0,0,0,.4);
}
h1{color:#fff;text-align:center;font-size:22px;margin-bottom:6px}
.sub{color:rgba(255,255,255,.45);text-align:center;font-size:13px;margin-bottom:32px}
.field{margin-bottom:20px}
.field label{display:block;color:rgba(255,255,255,.75);font-size:13px;margin-bottom:6px;font-weight:500}
.field select{
  width:100%;padding:12px 14px;
  background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);
  border-radius:10px;color:#fff;font-size:14px;cursor:pointer;
  appearance:none;transition:border .2s;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='%23aaa' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 14px center;
}
.field select:focus{outline:none;border-color:#6c63ff;box-shadow:0 0 0 3px rgba(108,99,255,.2)}
.field select option{background:#1a1a2e;color:#fff}
.btn{
  width:100%;padding:14px;margin-top:8px;
  background:linear-gradient(135deg,#6c63ff,#3b82f6);
  border:none;border-radius:12px;color:#fff;font-size:15px;font-weight:600;
  cursor:pointer;transition:all .25s;
}
.btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(108,99,255,.35)}
.btn:active{transform:translateY(0)}
.btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
.status{margin-top:16px;text-align:center;color:rgba(255,255,255,.6);font-size:13px;min-height:20px}
.info-box{
  margin-top:20px;padding:14px 16px;
  background:rgba(108,99,255,.1);border:1px solid rgba(108,99,255,.2);
  border-radius:12px;display:none;
}
.info-box.show{display:block}
.info-row{display:flex;justify-content:space-between;padding:5px 0;font-size:12px;color:rgba(255,255,255,.6)}
.info-row span:last-child{color:#a78bfa;font-weight:500;max-width:60%;text-align:right;word-break:break-all}
.foot{text-align:center;margin-top:24px;color:rgba(255,255,255,.3);font-size:11px}
.foot a{color:#6c63ff;text-decoration:none}
.foot a:hover{text-decoration:underline}
</style>
</head>
<body>
<div class="card">
  <h1>v2rayNG Downloader</h1>
  <p class="sub">GitHub Release Proxy</p>

  <div class="field">
    <label>Release 类型</label>
    <select id="release">
      <option value="latest">Latest（稳定版）</option>
      <option value="pre-release">Pre-release（预览版）</option>
    </select>
  </div>

  <div class="field">
    <label>架构</label>
    <select id="arch">
      <option value="arm64">arm64-v8a（推荐）</option>
      <option value="arm">armeabi-v7a</option>
      <option value="x86_64">x86_64</option>
      <option value="x86">x86</option>
      <option value="universal">universal（通用）</option>
    </select>
  </div>

  <button class="btn" id="btn" onclick="go()">下载 APK</button>
  <div class="status" id="status"></div>

  <div class="info-box" id="info">
    <div class="info-row"><span>版本</span><span id="ver">-</span></div>
    <div class="info-row"><span>文件</span><span id="fname">-</span></div>
    <div class="info-row"><span>大小</span><span id="fsize">-</span></div>
  </div>

  <div class="foot">
    Source:&nbsp;<a href="https://github.com/2dust/v2rayNG" target="_blank">2dust/v2rayNG</a>
  </div>
</div>

<script>
async function go(){
  const r=document.getElementById('release').value;
  const a=document.getElementById('arch').value;
  const btn=document.getElementById('btn');
  const st=document.getElementById('status');
  const info=document.getElementById('info');

  btn.disabled=true;st.textContent='正在获取版本信息…';info.classList.remove('show');

  try{
    const res=await fetch('/api/info?release='+r+'&arch='+a);
    const d=await res.json();
    if(d.error) throw new Error(d.error);

    document.getElementById('ver').textContent=d.version+(d.prerelease?' (pre)':'');
    document.getElementById('fname').textContent=d.filename;
    document.getElementById('fsize').textContent=fmt(d.size);
    info.classList.add('show');

    st.textContent='开始下载…';
    window.location.href='/api/download?release='+r+'&arch='+a;
    st.textContent='下载已触发';
  }catch(e){
    st.textContent='错误: '+e.message;
  }finally{
    btn.disabled=false;
  }
}
function fmt(b){
  if(b<1024)return b+' B';
  if(b<1048576)return (b/1024).toFixed(1)+' KB';
  return (b/1048576).toFixed(1)+' MB';
}
</script>
</body>
</html>`;
}

// ─── Worker 入口 ───────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const repo = env.GITHUB_REPO || '2dust/v2rayNG';
    const { pathname } = new URL(request.url);

    try {
      if (pathname === '/api/info') return handleInfo(request, repo);
      if (pathname === '/api/download') return handleDownload(request, repo);
      return new Response(renderPage(), {
        headers: { 'Content-Type': 'text/html;charset=utf-8' },
      });
    } catch (e) {
      return Response.json({ error: e.message }, { status: 500 });
    }
  },
};
