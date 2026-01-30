/**
 * FireX Downloader - Cloudflare Worker
 * v2rayNG (Android) + v2rayN (PC) GitHub Release 代理下载
 */
import { Hono } from 'hono';
import { NG_ARCHS, N_VARIANTS } from './config.js';
import { getRelease, findAsset, proxyDownload } from './github.js';
import { renderPage } from './page.js';

const app = new Hono();

// ─── 页面 ──────────────────────────────────────────────────────

app.get('/', (c) => c.html(renderPage()));

// ─── API: 获取版本信息 ─────────────────────────────────────────

app.get('/api/info', async (c) => {
  const { product, release, arch, pattern } = c.req.query();
  const env = c.env;

  try {
    if (product === 'ng') {
      // v2rayNG
      const repo = env.V2RAYNG_REPO || '2dust/v2rayNG';
      const rel = await getRelease(repo, release || 'latest');
      const archCfg = NG_ARCHS.find((a) => a.value === arch) || NG_ARCHS[0];
      const asset = findAsset(rel, archCfg.pattern);

      return c.json({
        version: rel.tag_name,
        filename: asset.name,
        size: asset.size,
        prerelease: rel.prerelease,
      });
    } else {
      // v2rayN
      const repo = env.V2RAYN_REPO || '2dust/v2rayN';
      const rel = await getRelease(repo, release || 'latest');
      const asset = findAsset(rel, pattern);

      return c.json({
        version: rel.tag_name,
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

app.get('/api/download', async (c) => {
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
