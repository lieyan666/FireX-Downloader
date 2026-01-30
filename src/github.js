/**
 * GitHub Release - 无 API 方式
 * 通过 URL 重定向和页面解析获取版本信息
 */

const GITHUB = 'https://github.com';

/**
 * 获取 latest release 的 tag（通过重定向）
 */
async function getLatestTag(repo) {
  const url = `${GITHUB}/${repo}/releases/latest`;
  const resp = await fetch(url, {
    method: 'HEAD',
    redirect: 'manual',
  });

  const location = resp.headers.get('location');
  if (!location) throw new Error('无法获取最新版本');

  // location: https://github.com/2dust/v2rayNG/releases/tag/2.0.7
  const tag = location.split('/tag/')[1];
  if (!tag) throw new Error('无法解析版本号');

  return decodeURIComponent(tag);
}

/**
 * 获取 pre-release 的 tag（解析 releases 页面）
 */
async function getPreReleaseTag(repo) {
  const url = `${GITHUB}/${repo}/releases`;
  const resp = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });

  if (!resp.ok) throw new Error(`获取 releases 页面失败: ${resp.status}`);

  const html = await resp.text();

  // 查找带有 Pre-release 标签的 release
  // 格式: /2dust/v2rayNG/releases/tag/xxx 后面跟着 Pre-release 标记
  const preReleasePattern = new RegExp(
    `/${repo.replace('/', '\\/')}/releases/tag/([^"]+)"[^>]*>[\\s\\S]*?Pre-release`,
    'i'
  );
  const match = html.match(preReleasePattern);

  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }

  // 备用方案：查找第一个 release tag
  const tagPattern = new RegExp(`/${repo.replace('/', '\\/')}/releases/tag/([^"]+)"`, 'i');
  const fallback = html.match(tagPattern);
  if (fallback && fallback[1]) {
    return decodeURIComponent(fallback[1]);
  }

  throw new Error('未找到 Pre-release 版本');
}

/**
 * 获取 release 的 assets 列表（解析 expanded_assets 页面）
 */
async function getAssets(repo, tag) {
  const url = `${GITHUB}/${repo}/releases/expanded_assets/${encodeURIComponent(tag)}`;
  const resp = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'text/html',
    },
  });

  if (!resp.ok) throw new Error(`获取 assets 失败: ${resp.status}`);

  const html = await resp.text();

  // 解析 asset 链接
  // 格式: href="/2dust/v2rayNG/releases/download/2.0.7/v2rayNG_2.0.7_arm64-v8a.apk"
  const pattern = new RegExp(
    `href="(/${repo.replace('/', '\\/')}/releases/download/[^"]+)"`,
    'g'
  );

  const assets = [];
  let match;
  while ((match = pattern.exec(html)) !== null) {
    const path = match[1];
    const name = path.split('/').pop();
    assets.push({
      name: decodeURIComponent(name),
      url: GITHUB + path,
    });
  }

  return assets;
}

// ─── 缓存层 ──────────────────────────────────────────────────────

const CACHE_TTL = 300;

async function cachedGetRelease(repo, type) {
  const cacheKey = `https://cache.internal/v2/${repo}/${type}`;
  const cache = caches.default;

  const cached = await cache.match(cacheKey);
  if (cached) {
    return cached.json();
  }

  // 获取 tag
  const tag = type === 'pre-release'
    ? await getPreReleaseTag(repo)
    : await getLatestTag(repo);

  // 获取 assets
  const assets = await getAssets(repo, tag);

  const release = {
    tag,
    prerelease: type === 'pre-release',
    assets,
  };

  const resp = new Response(JSON.stringify(release), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': `s-maxage=${CACHE_TTL}`,
    },
  });
  await cache.put(cacheKey, resp.clone());

  return release;
}

// ─── 导出接口 ────────────────────────────────────────────────────

export async function getRelease(repo, type) {
  return cachedGetRelease(repo, type || 'latest');
}

export function findAsset(release, pattern) {
  const p = pattern.toLowerCase();
  const asset = release.assets.find((a) => {
    const name = a.name.toLowerCase();
    return name === p || name.includes(p);
  });
  if (!asset) throw new Error(`未找到匹配的文件: ${pattern}`);
  return {
    name: asset.name,
    browser_download_url: asset.url,
    size: 0, // 无法提前获取大小
  };
}

export async function proxyDownload(asset) {
  const resp = await fetch(asset.browser_download_url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    redirect: 'follow',
  });

  if (!resp.ok) throw new Error(`下载失败: HTTP ${resp.status}`);

  const size = resp.headers.get('content-length') || '';

  return new Response(resp.body, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${asset.name}"`,
      ...(size && { 'Content-Length': size }),
    },
  });
}
