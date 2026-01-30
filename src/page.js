/**
 * 前端页面模板
 */
import { NG_ARCHS, N_PLATFORMS, N_VARIANTS, N_NOTES } from './config.js';

export function renderPage() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>FireX Downloader</title>
<style>${CSS}</style>
</head>
<body>
<div id="app"></div>
<script>
${clientConfig()}
${CLIENT_JS}
</script>
</body>
</html>`;
}

/** 把服务端配置传给前端 */
function clientConfig() {
  return `const NG_ARCHS=${JSON.stringify(NG_ARCHS)};
const N_PLATFORMS=${JSON.stringify(N_PLATFORMS)};
const N_VARIANTS=${JSON.stringify(N_VARIANTS)};
const N_NOTES=${JSON.stringify(N_NOTES)};`;
}

// ─── CSS ───────────────────────────────────────────────────────

const CSS = /*css*/ `
:root {
  --bg: #0c0e1a;
  --card: rgba(255,255,255,.04);
  --card-border: rgba(255,255,255,.08);
  --accent: #7c6aef;
  --accent2: #3b82f6;
  --accent-glow: rgba(124,106,239,.25);
  --text: #e2e2e8;
  --text2: rgba(255,255,255,.5);
  --text3: rgba(255,255,255,.3);
  --radius: 14px;
  --radius-sm: 10px;
}
* { margin:0; padding:0; box-sizing:border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Roboto, sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
  background-image:
    radial-gradient(ellipse 80% 60% at 50% -20%, rgba(124,106,239,.12), transparent),
    radial-gradient(ellipse 60% 50% at 80% 100%, rgba(59,130,246,.08), transparent);
}
#app { width: 100%; max-width: 520px; }

/* ── Header ── */
.header { text-align: center; margin-bottom: 32px; }
.header h1 {
  font-size: 26px; font-weight: 700;
  background: linear-gradient(135deg, #fff 30%, var(--accent));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.header p { color: var(--text2); font-size: 13px; margin-top: 6px; }

/* ── Tabs (product selector) ── */
.tabs {
  display: flex; gap: 10px; margin-bottom: 24px;
}
.tab {
  flex: 1; padding: 16px 12px;
  background: var(--card); border: 1px solid var(--card-border);
  border-radius: var(--radius); cursor: pointer;
  text-align: center; transition: all .2s;
}
.tab:hover { border-color: rgba(255,255,255,.15); background: rgba(255,255,255,.06); }
.tab.active {
  border-color: var(--accent);
  background: linear-gradient(135deg, rgba(124,106,239,.1), rgba(59,130,246,.06));
  box-shadow: 0 0 20px var(--accent-glow);
}
.tab-name { font-size: 15px; font-weight: 600; }
.tab-desc { font-size: 11px; color: var(--text2); margin-top: 4px; }

/* ── Card ── */
.card {
  background: var(--card); border: 1px solid var(--card-border);
  border-radius: var(--radius); padding: 24px;
  margin-bottom: 16px;
  animation: fadeIn .25s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── Form fields ── */
.field { margin-bottom: 18px; }
.field:last-child { margin-bottom: 0; }
.field-label {
  display: block; font-size: 12px; font-weight: 500;
  color: var(--text2); margin-bottom: 8px; text-transform: uppercase; letter-spacing: .5px;
}
select {
  width: 100%; padding: 11px 14px;
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
  border-radius: var(--radius-sm); color: var(--text); font-size: 14px;
  cursor: pointer; appearance: none; transition: border .2s;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='%23888' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 12px center;
}
select:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
select option { background: #1a1a2e; color: #fff; }

/* ── Platform pills ── */
.pills {
  display: flex; gap: 8px; flex-wrap: wrap;
}
.pill {
  padding: 8px 16px; border-radius: 8px;
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
  font-size: 13px; cursor: pointer; transition: all .2s;
  color: var(--text2);
}
.pill:hover { border-color: rgba(255,255,255,.2); color: var(--text); }
.pill.active { border-color: var(--accent); color: #fff; background: rgba(124,106,239,.15); }

/* ── Variant list ── */
.variant-list { display: flex; flex-direction: column; gap: 10px; }
.variant-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px;
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07);
  border-radius: var(--radius-sm); transition: all .2s;
}
.variant-item:hover { border-color: rgba(255,255,255,.14); background: rgba(255,255,255,.05); }
.variant-info { flex: 1; min-width: 0; }
.variant-name { font-size: 14px; font-weight: 500; }
.variant-desc { font-size: 11px; color: var(--text3); margin-top: 2px; }
.variant-dl {
  margin-left: 12px; padding: 8px 16px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  border: none; border-radius: 8px; color: #fff;
  font-size: 12px; font-weight: 600; cursor: pointer;
  white-space: nowrap; transition: all .2s;
}
.variant-dl:hover { transform: translateY(-1px); box-shadow: 0 4px 16px var(--accent-glow); }

/* ── Notes ── */
.notes {
  padding: 14px 16px;
  background: rgba(124,106,239,.06);
  border: 1px solid rgba(124,106,239,.12);
  border-radius: var(--radius-sm);
  margin-top: 16px;
}
.notes-title { font-size: 12px; font-weight: 600; color: var(--accent); margin-bottom: 8px; }
.notes-req { font-size: 11px; color: var(--text2); margin-bottom: 8px; }
.notes-req strong { color: var(--text); }
.notes ul { padding-left: 16px; }
.notes li { font-size: 12px; color: var(--text2); margin-bottom: 4px; line-height: 1.5; }
.notes li code { background: rgba(255,255,255,.08); padding: 1px 5px; border-radius: 3px; font-size: 11px; }
.notes li a { color: var(--accent); text-decoration: none; }
.notes li a:hover { text-decoration: underline; }

/* ── Download button (NG) ── */
.btn-primary {
  width: 100%; padding: 14px; margin-top: 4px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  border: none; border-radius: 12px; color: #fff;
  font-size: 15px; font-weight: 600; cursor: pointer; transition: all .25s;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px var(--accent-glow); }
.btn-primary:disabled { opacity: .5; cursor: not-allowed; transform: none; }

/* ── Status / info ── */
.status { text-align: center; color: var(--text2); font-size: 13px; margin-top: 12px; min-height: 18px; }
.info-box {
  margin-top: 14px; padding: 12px 14px;
  background: rgba(124,106,239,.08); border: 1px solid rgba(124,106,239,.15);
  border-radius: var(--radius-sm); display: none;
}
.info-box.show { display: block; }
.info-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 12px; color: var(--text2); }
.info-row span:last-child { color: var(--accent); font-weight: 500; max-width: 65%; text-align: right; word-break: break-all; }

/* ── Release type toggle ── */
.release-toggle {
  display: flex; gap: 0; margin-bottom: 18px;
  background: rgba(255,255,255,.04); border-radius: 8px; overflow: hidden;
  border: 1px solid rgba(255,255,255,.08);
}
.release-opt {
  flex: 1; padding: 9px 12px; text-align: center;
  font-size: 13px; cursor: pointer; transition: all .2s;
  color: var(--text2); border: none; background: none;
}
.release-opt:first-child { border-right: 1px solid rgba(255,255,255,.08); }
.release-opt.active {
  background: rgba(124,106,239,.15); color: #fff; font-weight: 500;
}

/* ── Footer ── */
.footer { text-align: center; margin-top: 20px; font-size: 11px; color: var(--text3); }
.footer a { color: var(--accent); text-decoration: none; }
.footer a:hover { text-decoration: underline; }
`;

// ─── Client JS ─────────────────────────────────────────────────

const CLIENT_JS = /*js*/ `
const $ = s => document.querySelector(s);
const app = $('#app');

let state = {
  product: 'ng',        // 'ng' | 'n'
  release: 'latest',    // 'latest' | 'pre-release'
  // NG
  ngArch: 'arm64',
  // N
  nPlatform: 'windows',
  nArch: 'x64',
};

function render() {
  app.innerHTML = renderHeader() + renderTabs() + renderReleaseToggle()
    + (state.product === 'ng' ? renderNG() : renderN())
    + renderFooter();
  bindEvents();
}

function renderHeader() {
  return '<div class="header"><h1>FireX Downloader</h1><p>GitHub Release Proxy · v2ray 系列快速下载</p></div>';
}

function renderTabs() {
  return '<div class="tabs">'
    + tab('ng', 'v2rayNG', 'Android')
    + tab('n', 'v2rayN', 'Windows · Linux · macOS')
    + '</div>';
}
function tab(id, name, desc) {
  return '<div class="tab' + (state.product === id ? ' active' : '') + '" data-tab="' + id + '">'
    + '<div class="tab-name">' + name + '</div>'
    + '<div class="tab-desc">' + desc + '</div></div>';
}

function renderReleaseToggle() {
  return '<div class="release-toggle">'
    + '<button class="release-opt' + (state.release === 'latest' ? ' active' : '') + '" data-rel="latest">Latest 稳定版</button>'
    + '<button class="release-opt' + (state.release === 'pre-release' ? ' active' : '') + '" data-rel="pre-release">Pre-release 预览版</button>'
    + '</div>';
}

// ── v2rayNG ──

function renderNG() {
  let opts = NG_ARCHS.map(a =>
    '<option value="' + a.value + '"' + (state.ngArch === a.value ? ' selected' : '') + '>'
    + a.label + '（' + a.desc + '）</option>'
  ).join('');

  return '<div class="card">'
    + '<div class="field"><span class="field-label">架构</span><select id="ng-arch">' + opts + '</select></div>'
    + '<button class="btn-primary" id="ng-dl">下载 APK</button>'
    + '<div class="status" id="ng-status"></div>'
    + '<div class="info-box" id="ng-info">'
    + '<div class="info-row"><span>版本</span><span id="ng-ver">-</span></div>'
    + '<div class="info-row"><span>文件</span><span id="ng-fname">-</span></div>'
    + '<div class="info-row"><span>大小</span><span id="ng-fsize">-</span></div>'
    + '</div></div>';
}

// ── v2rayN ──

function renderN() {
  // Platform pills
  let pills = N_PLATFORMS.map(p =>
    '<div class="pill' + (state.nPlatform === p.value ? ' active' : '') + '" data-plat="' + p.value + '">' + p.label + '</div>'
  ).join('');

  // Arch pills
  let archs = Object.keys(N_VARIANTS[state.nPlatform]);
  let archPills = archs.map(a =>
    '<div class="pill' + (state.nArch === a ? ' active' : '') + '" data-narch="' + a + '">' + a + '</div>'
  ).join('');

  // Variant list
  let variants = N_VARIANTS[state.nPlatform][state.nArch] || [];
  let list = variants.map(v =>
    '<div class="variant-item">'
    + '<div class="variant-info"><div class="variant-name">' + v.label + '</div>'
    + '<div class="variant-desc">' + v.desc + '</div></div>'
    + '<button class="variant-dl" data-pattern="' + v.pattern + '">下载</button>'
    + '</div>'
  ).join('');

  // Notes
  let note = N_NOTES[state.nPlatform];
  let noteHtml = '<div class="notes"><div class="notes-title">说明</div>'
    + '<div class="notes-req">系统要求: <strong>' + note.requirements + '</strong></div>'
    + '<ul>' + note.notes.map(n => '<li>' + n + '</li>').join('') + '</ul></div>';

  return '<div class="card">'
    + '<div class="field"><span class="field-label">操作系统</span><div class="pills" id="plat-pills">' + pills + '</div></div>'
    + '<div class="field"><span class="field-label">架构</span><div class="pills" id="arch-pills">' + archPills + '</div></div>'
    + '<div class="variant-list" id="n-variants">' + list + '</div>'
    + '<div class="status" id="n-status"></div>'
    + noteHtml
    + '</div>';
}

function renderFooter() {
  const repo = state.product === 'ng' ? '2dust/v2rayNG' : '2dust/v2rayN';
  return '<div class="footer">Source: <a href="https://github.com/' + repo + '" target="_blank">' + repo + '</a></div>';
}

// ── Events ──

function bindEvents() {
  document.querySelectorAll('.tab').forEach(el => {
    el.onclick = () => {
      state.product = el.dataset.tab;
      if (state.product === 'n') {
        // 确保 nArch 对当前平台有效
        let archs = Object.keys(N_VARIANTS[state.nPlatform]);
        if (!archs.includes(state.nArch)) state.nArch = archs[0];
      }
      render();
    };
  });

  document.querySelectorAll('.release-opt').forEach(el => {
    el.onclick = () => { state.release = el.dataset.rel; render(); };
  });

  // NG
  const ngArch = $('#ng-arch');
  if (ngArch) ngArch.onchange = () => { state.ngArch = ngArch.value; };

  const ngDl = $('#ng-dl');
  if (ngDl) ngDl.onclick = () => downloadNG();

  // N
  document.querySelectorAll('#plat-pills .pill').forEach(el => {
    el.onclick = () => {
      state.nPlatform = el.dataset.plat;
      let archs = Object.keys(N_VARIANTS[state.nPlatform]);
      if (!archs.includes(state.nArch)) state.nArch = archs[0];
      render();
    };
  });
  document.querySelectorAll('#arch-pills .pill').forEach(el => {
    el.onclick = () => { state.nArch = el.dataset.narch; render(); };
  });
  document.querySelectorAll('.variant-dl').forEach(el => {
    el.onclick = () => downloadN(el.dataset.pattern);
  });
}

// ── Download NG ──

async function downloadNG() {
  const btn = $('#ng-dl');
  const st = $('#ng-status');
  const info = $('#ng-info');
  btn.disabled = true; st.textContent = '获取版本信息…'; info.classList.remove('show');

  try {
    const q = 'product=ng&release=' + state.release + '&arch=' + state.ngArch;
    const res = await fetch('/api/info?' + q);
    const d = await res.json();
    if (d.error) throw new Error(d.error);

    $('#ng-ver').textContent = d.version + (d.prerelease ? ' (pre)' : '');
    $('#ng-fname').textContent = d.filename;
    $('#ng-fsize').textContent = fmt(d.size);
    info.classList.add('show');
    st.textContent = '开始下载…';
    window.location.href = '/api/download?' + q;
    setTimeout(() => { st.textContent = ''; }, 2000);
  } catch (e) {
    st.textContent = '错误: ' + e.message;
  } finally {
    btn.disabled = false;
  }
}

// ── Download N ──

async function downloadN(pattern) {
  const st = $('#n-status');
  st.textContent = '获取中…';

  try {
    const q = 'product=n&release=' + state.release + '&pattern=' + encodeURIComponent(pattern);
    const res = await fetch('/api/info?' + q);
    const d = await res.json();
    if (d.error) throw new Error(d.error);
    st.textContent = d.version + ' · ' + fmt(d.size) + ' · 下载中…';
    window.location.href = '/api/download?' + q;
    setTimeout(() => { st.textContent = ''; }, 2000);
  } catch (e) {
    st.textContent = '错误: ' + e.message;
  }
}

function fmt(b) {
  if (b < 1024) return b + ' B';
  if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
  return (b / 1048576).toFixed(1) + ' MB';
}

// ── Init ──
render();
`;
