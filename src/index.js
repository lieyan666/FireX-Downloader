/**
 * FireX Downloader - Cloudflare Worker
 * v2rayNG (Android) + v2rayN (PC) GitHub Release 代理下载
 */
import { Hono } from 'hono';
import { NG_ARCHS } from './config.js';
import { getRelease, findAsset, proxyDownload } from './github.js';
import { renderPage } from './page.js';

const app = new Hono();

// ─── 密码验证中间件 ────────────────────────────────────────────

function verifyAuth(c, next) {
  const password = c.env.ACCESS_PASSWORD || '23666';
  const auth = c.req.header('X-Access-Token') || c.req.query('token');

  if (auth !== password) {
    return c.json({ error: 'Unauthorized', needAuth: true }, 401);
  }
  return next();
}

// ─── 页面 ──────────────────────────────────────────────────────

app.get('/', (c) => {
  return c.html(renderPage());
});

// ─── 验证密码 ──────────────────────────────────────────────────

app.post('/api/auth', async (c) => {
  const password = c.env.ACCESS_PASSWORD || '23666';
  const body = await c.req.json();

  if (body.password === password) {
    return c.json({ success: true, token: password });
  }
  return c.json({ success: false, error: '密码错误' }, 401);
});

// ─── API: 获取版本信息 ─────────────────────────────────────────

app.get('/api/info', verifyAuth, async (c) => {
  const { product, release, arch, pattern } = c.req.query();
  const env = c.env;

  try {
    if (product === 'ng') {
      const repo = env.V2RAYNG_REPO || '2dust/v2rayNG';
      const rel = await getRelease(repo, release || 'latest');
      const archCfg = NG_ARCHS.find((a) => a.value === arch) || NG_ARCHS[0];
      const asset = findAsset(rel, archCfg.pattern);

      return c.json({
        version: rel.tag,
        filename: asset.name,
        size: asset.size,
        prerelease: rel.prerelease,
      });
    } else {
      const repo = env.V2RAYN_REPO || '2dust/v2rayN';
      const rel = await getRelease(repo, release || 'latest');
      const asset = findAsset(rel, pattern);

      return c.json({
        version: rel.tag,
        filename: asset.name,
        size: asset.size,
        prerelease: rel.prerelease,
      });
    }
  } catch (e) {
    return c.json({ error: e.message }, 400);
  }
});

// ─── API: 代理下载 ─────────────────────────────────────────────

app.get('/api/download', verifyAuth, async (c) => {
  const { product, release, arch, pattern } = c.req.query();
  const env = c.env;

  try {
    let asset;
    if (product === 'ng') {
      const repo = env.V2RAYNG_REPO || '2dust/v2rayNG';
      const rel = await getRelease(repo, release || 'latest');
      const archCfg = NG_ARCHS.find((a) => a.value === arch) || NG_ARCHS[0];
      asset = findAsset(rel, archCfg.pattern);
    } else {
      const repo = env.V2RAYN_REPO || '2dust/v2rayN';
      const rel = await getRelease(repo, release || 'latest');
      asset = findAsset(rel, pattern);
    }

    return proxyDownload(asset);
  } catch (e) {
    return c.json({ error: e.message }, 400);
  }
});

// ─── Export ────────────────────────────────────────────────────

export default app;
