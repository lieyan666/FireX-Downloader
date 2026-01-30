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

function clientConfig() {
  return `const NG_ARCHS=${JSON.stringify(NG_ARCHS)};
const N_PLATFORMS=${JSON.stringify(N_PLATFORMS)};
const N_VARIANTS=${JSON.stringify(N_VARIANTS)};
const N_NOTES=${JSON.stringify(N_NOTES)};`;
}

// ─── CSS ───────────────────────────────────────────────────────

const CSS = /*css*/ `
:root {
  --bg-base: #08090c;
  --bg-surface: #0f1114;
  --bg-elevated: #161a1f;
  --bg-hover: #1c2128;
  --border: #252b33;
  --border-subtle: #1a1f25;
  --accent: #018eee;
  --accent-soft: rgba(1,142,238,.1);
  --accent-glow: rgba(1,142,238,.08);
  --accent-text: #3aa8f5;
  --text-primary: #e8eaed;
  --text-secondary: #9ba1a8;
  --text-tertiary: #5c6370;
  --success: #22c55e;
  --radius: 12px;
  --radius-sm: 8px;
  --transition: .2s cubic-bezier(.4,0,.2,1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif;
  background: var(--bg-base);
  color: var(--text-primary);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  -webkit-font-smoothing: antialiased;
}

#app {
  width: 100%;
  max-width: 480px;
}

/* ── Header ── */
.header {
  text-align: center;
  margin-bottom: 28px;
}
.header h1 {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.3px;
  color: var(--text-primary);
}
.header p {
  font-size: 13px;
  color: var(--text-tertiary);
  margin-top: 6px;
}

/* ── Tabs ── */
.tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 20px;
}
.tab {
  padding: 14px 16px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  cursor: pointer;
  text-align: center;
  transition: all var(--transition);
}
.tab:hover {
  background: var(--bg-elevated);
  border-color: var(--border);
}
.tab.active {
  background: var(--accent-soft);
  border-color: var(--accent);
  box-shadow: 0 0 20px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,.03);
}
.tab-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  transition: color var(--transition);
}
.tab.active .tab-name {
  color: var(--accent-text);
}
.tab-desc {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 3px;
}

/* ── Release Toggle ── */
.release-toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin-bottom: 16px;
}
.release-opt {
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all var(--transition);
}
.release-opt:first-child {
  border-right: 1px solid var(--border-subtle);
}
.release-opt:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
}
.release-opt.active {
  background: var(--accent-soft);
  color: var(--accent-text);
}

/* ── Card ── */
.card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  padding: 20px;
}

/* ── Form Fields ── */
.field {
  margin-bottom: 16px;
}
.field:last-child {
  margin-bottom: 0;
}
.field-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

select {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  color: var(--text-primary);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  appearance: none;
  transition: border-color var(--transition);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23606068' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
}
select:hover {
  border-color: var(--text-tertiary);
}
select:focus {
  outline: none;
  border-color: var(--accent);
}
select option {
  background: var(--bg-elevated);
  color: var(--text-primary);
}

/* ── Pills ── */
.pills {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.pill {
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition);
}
.pill:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
  border-color: var(--text-tertiary);
}
.pill.active {
  color: var(--accent-text);
  background: var(--accent-soft);
  border-color: var(--accent);
  box-shadow: 0 0 12px var(--accent-glow);
}

/* ── Platform Pills (larger) ── */
.pills-lg {
  display: flex;
  gap: 8px;
}
.pills-lg .pill {
  flex: 1;
  padding: 14px 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  border-radius: var(--radius);
}

/* ── Variant List ── */
.variant-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}
.variant-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  transition: all var(--transition);
}
.variant-item:hover {
  background: var(--bg-hover);
  border-color: var(--border);
}
.variant-info {
  flex: 1;
  min-width: 0;
}
.variant-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
}
.variant-desc {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 2px;
}
.variant-dl {
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background: var(--accent);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition);
}
.variant-dl:hover {
  background: #0099ff;
  box-shadow: 0 4px 12px rgba(1,142,238,.25);
}

/* ── Primary Button ── */
.btn-primary {
  width: 100%;
  padding: 12px 16px;
  margin-top: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: var(--accent);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition);
}
.btn-primary:hover {
  background: #0099ff;
  box-shadow: 0 4px 16px rgba(1,142,238,.3);
}
.btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
}

/* ── Status ── */
.status {
  text-align: center;
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 12px;
  min-height: 16px;
}

/* ── Info Box ── */
.info-box {
  margin-top: 12px;
  padding: 10px 12px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  display: none;
  transition: all var(--transition);
}
.info-box.show {
  display: block;
}
.info-row {
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
  font-size: 12px;
}
.info-row span:first-child {
  color: var(--text-tertiary);
}
.info-row span:last-child {
  color: var(--accent-text);
  font-weight: 500;
  text-align: right;
  max-width: 65%;
  word-break: break-all;
}

/* ── Notes ── */
.notes {
  margin-top: 16px;
  padding: 12px 14px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
}
.notes-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--accent-text);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}
.notes-req {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}
.notes-req strong {
  color: var(--text-primary);
  font-weight: 500;
}
.notes ul {
  padding-left: 14px;
  margin: 0;
}
.notes li {
  font-size: 12px;
  color: var(--text-tertiary);
  line-height: 1.6;
  margin-bottom: 2px;
}
.notes li code {
  font-family: 'SF Mono', Menlo, monospace;
  font-size: 11px;
  padding: 2px 6px;
  background: var(--bg-base);
  border-radius: 4px;
  color: var(--text-secondary);
}
.notes li a {
  color: var(--accent-text);
  text-decoration: none;
  transition: color var(--transition);
}
.notes li a:hover {
  color: var(--accent);
}

/* ── Footer ── */
.footer {
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  color: var(--text-tertiary);
}
.footer a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--transition);
}
.footer a:hover {
  color: var(--accent-text);
}

/* ── Login ── */
.login-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  padding: 32px 24px;
  text-align: center;
}
.login-card h1 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
}
.login-card p {
  font-size: 13px;
  color: var(--text-tertiary);
  margin-bottom: 24px;
}
.login-input {
  width: 100%;
  padding: 11px 14px;
  font-size: 14px;
  color: var(--text-primary);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  text-align: center;
  letter-spacing: 4px;
  transition: border-color var(--transition);
}
.login-input::placeholder {
  letter-spacing: 0;
  color: var(--text-tertiary);
}
.login-input:focus {
  outline: none;
  border-color: var(--accent);
}
.login-error {
  font-size: 12px;
  color: #f87171;
  margin-top: 8px;
  min-height: 18px;
}
.login-card .btn-primary {
  margin-top: 16px;
}
.login-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 16px;
  font-size: 11px;
  color: var(--text-tertiary);
}
.login-footer .lock-icon {
  width: 12px;
  height: 12px;
  opacity: .5;
}
`;

// ─── Client JS ─────────────────────────────────────────────────

const CLIENT_JS = /*js*/ `
const $ = s => document.querySelector(s);
const app = $('#app');
const TOKEN_KEY = 'firex_token';

let state = {
  product: 'ng',
  release: 'latest',
  ngArch: 'arm64',
  nPlatform: 'windows',
  nArch: 'x64',
};

// ── Auth ──

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function apiFetch(url) {
  const token = getToken();
  const res = await fetch(url, {
    headers: token ? { 'X-Access-Token': token } : {}
  });
  const data = await res.json();
  if (data.needAuth) {
    clearToken();
    renderLogin();
    throw new Error('请先登录');
  }
  return data;
}

function renderLogin(error = '') {
  app.innerHTML =
    '<div class="login-card">' +
    '<h1>FireX Downloader</h1>' +
    '<p>请输入访问密码</p>' +
    '<input type="password" class="login-input" id="pwd" placeholder="Password" autofocus>' +
    '<div class="login-error" id="login-err">' + error + '</div>' +
    '<button class="btn-primary" id="login-btn">进入</button>' +
    '<div class="login-footer">' +
    '<svg class="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>' +
    '<span>私有访问</span>' +
    '</div>' +
    '</div>';

  const pwdInput = $('#pwd');
  const loginBtn = $('#login-btn');
  const errEl = $('#login-err');

  const doLogin = async () => {
    const pwd = pwdInput.value.trim();
    if (!pwd) {
      errEl.textContent = '请输入密码';
      return;
    }
    loginBtn.disabled = true;
    loginBtn.textContent = '验证中...';
    errEl.textContent = '';

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd })
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        render();
      } else {
        errEl.textContent = data.error || '密码错误';
        pwdInput.value = '';
        pwdInput.focus();
      }
    } catch (e) {
      errEl.textContent = '网络错误';
    } finally {
      loginBtn.disabled = false;
      loginBtn.textContent = '进入';
    }
  };

  loginBtn.onclick = doLogin;
  pwdInput.onkeydown = (e) => { if (e.key === 'Enter') doLogin(); };
}

// ── Main App ──

function render() {
  if (!getToken()) {
    renderLogin();
    return;
  }
  app.innerHTML = renderHeader() + renderTabs() + renderReleaseToggle()
    + (state.product === 'ng' ? renderNG() : renderN())
    + renderFooter();
  bindEvents();
}

function renderHeader() {
  return '<div class="header"><h1>FireX Downloader</h1><p>v2ray 系列 GitHub Release 代理</p></div>';
}

function renderTabs() {
  return '<div class="tabs">'
    + tab('ng', 'v2rayNG', 'Android')
    + tab('n', 'v2rayN', 'Windows / Linux / macOS')
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
    + '<button class="release-opt' + (state.release === 'pre-release' ? ' active' : '') + '" data-rel="pre-release">Pre-release 最新</button>'
    + '</div>';
}

function renderNG() {
  let opts = NG_ARCHS.map(a =>
    '<option value="' + a.value + '"' + (state.ngArch === a.value ? ' selected' : '') + '>'
    + a.label + ' · ' + a.desc + '</option>'
  ).join('');

  return '<div class="card">'
    + '<div class="field"><span class="field-label">Architecture</span><select id="ng-arch">' + opts + '</select></div>'
    + '<button class="btn-primary" id="ng-dl">Download APK</button>'
    + '<div class="status" id="ng-status"></div>'
    + '<div class="info-box" id="ng-info">'
    + '<div class="info-row"><span>Version</span><span id="ng-ver">-</span></div>'
    + '<div class="info-row"><span>File</span><span id="ng-fname">-</span></div>'
    + '</div></div>';
}

function renderN() {
  let pills = N_PLATFORMS.map(p =>
    '<div class="pill' + (state.nPlatform === p.value ? ' active' : '') + '" data-plat="' + p.value + '">' + p.label + '</div>'
  ).join('');

  // 架构说明
  const archLabels = {
    windows: { x64: 'x64 · Intel / AMD', arm64: 'ARM64 · 高通等' },
    linux: { x64: 'x64 · Intel / AMD', arm64: 'ARM64 · 树莓派等' },
    macos: { x64: 'x64 · Intel 芯片', arm64: 'ARM64 · Apple Silicon' },
  };

  let archs = Object.keys(N_VARIANTS[state.nPlatform]);
  let archPills = archs.map(a =>
    '<div class="pill' + (state.nArch === a ? ' active' : '') + '" data-narch="' + a + '">' + archLabels[state.nPlatform][a] + '</div>'
  ).join('');

  let variants = N_VARIANTS[state.nPlatform][state.nArch] || [];
  let list = variants.map(v =>
    '<div class="variant-item">'
    + '<div class="variant-info"><div class="variant-name">' + v.label + '</div>'
    + '<div class="variant-desc">' + v.desc + '</div></div>'
    + '<button class="variant-dl" data-pattern="' + v.pattern + '">Download</button>'
    + '</div>'
  ).join('');

  let note = N_NOTES[state.nPlatform];
  let noteHtml = '<div class="notes"><div class="notes-title">Notes</div>'
    + '<div class="notes-req">Requires: <strong>' + note.requirements + '</strong></div>'
    + '<ul>' + note.notes.map(n => '<li>' + n + '</li>').join('') + '</ul></div>';

  return '<div class="card">'
    + '<div class="field"><span class="field-label">Platform</span><div class="pills pills-lg" id="plat-pills">' + pills + '</div></div>'
    + '<div class="field"><span class="field-label">Architecture</span><div class="pills" id="arch-pills">' + archPills + '</div></div>'
    + '<div class="variant-list" id="n-variants">' + list + '</div>'
    + '<div class="status" id="n-status"></div>'
    + noteHtml
    + '</div>';
}

function renderFooter() {
  const repo = state.product === 'ng' ? '2dust/v2rayNG' : '2dust/v2rayN';
  return '<div class="footer"><a href="https://github.com/' + repo + '" target="_blank">' + repo + '</a></div>';
}

function bindEvents() {
  document.querySelectorAll('.tab').forEach(el => {
    el.onclick = () => {
      state.product = el.dataset.tab;
      if (state.product === 'n') {
        let archs = Object.keys(N_VARIANTS[state.nPlatform]);
        if (!archs.includes(state.nArch)) state.nArch = archs[0];
      }
      render();
    };
  });

  document.querySelectorAll('.release-opt').forEach(el => {
    el.onclick = () => { state.release = el.dataset.rel; render(); };
  });

  const ngArch = $('#ng-arch');
  if (ngArch) ngArch.onchange = () => { state.ngArch = ngArch.value; };

  const ngDl = $('#ng-dl');
  if (ngDl) ngDl.onclick = () => downloadNG();

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

async function downloadNG() {
  const btn = $('#ng-dl');
  const st = $('#ng-status');
  const info = $('#ng-info');
  btn.disabled = true;
  st.textContent = 'Fetching...';
  info.classList.remove('show');

  try {
    const q = 'product=ng&release=' + state.release + '&arch=' + state.ngArch;
    const d = await apiFetch('/api/info?' + q);
    if (d.error) throw new Error(d.error);

    $('#ng-ver').textContent = d.version + (d.prerelease ? ' (pre)' : '');
    $('#ng-fname').textContent = d.filename;
    info.classList.add('show');
    st.textContent = 'Starting download...';
    window.location.href = '/api/download?' + q + '&token=' + encodeURIComponent(getToken());
    setTimeout(() => { st.textContent = ''; }, 2000);
  } catch (e) {
    st.textContent = 'Error: ' + e.message;
  } finally {
    btn.disabled = false;
  }
}

async function downloadN(pattern) {
  const st = $('#n-status');
  st.textContent = 'Fetching...';

  try {
    const q = 'product=n&release=' + state.release + '&pattern=' + encodeURIComponent(pattern);
    const d = await apiFetch('/api/info?' + q);
    if (d.error) throw new Error(d.error);
    st.textContent = d.version + ' · Downloading...';
    window.location.href = '/api/download?' + q + '&token=' + encodeURIComponent(getToken());
    setTimeout(() => { st.textContent = ''; }, 2000);
  } catch (e) {
    st.textContent = 'Error: ' + e.message;
  }
}

render();
`;
