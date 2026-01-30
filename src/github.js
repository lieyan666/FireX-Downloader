/**
 * GitHub Release API 封装
 */
import { GITHUB_API, CACHE_TTL } from './config.js';

/**
 * 从 GitHub API 获取 release
 */
async function fetchFromGitHub(url) {
  const resp = await fetch(url, {
    headers: {
      'User-Agent': 'FireX-Downloader',
      Accept: 'application/vnd.github+json',
    },
  });
  if (!resp.ok) throw new Error(`GitHub API error: ${resp.status}`);
  return resp.json();
}

/**
 * 带 Cache API 缓存的 release 获取
 */
export async function getRelease(repo, type) {
  const cacheKey = `https://cache.internal/${repo}/${type}`;
  const cache = caches.default;

  const cached = await cache.match(cacheKey);
  if (cached) return cached.json();

  let release;
  if (type === 'pre-release') {
    const list = await fetchFromGitHub(`${GITHUB_API}/repos/${repo}/releases`);
    release = list.find((r) => r.prerelease);
    if (!release) throw new Error('未找到 Pre-release 版本');
  } else {
    release = await fetchFromGitHub(`${GITHUB_API}/repos/${repo}/releases/latest`);
  }

  const resp = new Response(JSON.stringify(release), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': `s-maxage=${CACHE_TTL}`,
    },
  });
  await cache.put(cacheKey, resp.clone());
  return resp.json();
}

/**
 * 在 release assets 中按文件名模式查找
 */
export function findAsset(release, pattern) {
  const p = pattern.toLowerCase();
  const asset = release.assets.find((a) => a.name.toLowerCase() === p || a.name.toLowerCase().includes(p));
  if (!asset) throw new Error(`未找到匹配的文件: ${pattern}`);
  return asset;
}

/**
 * 代理下载 asset
 */
export async function proxyDownload(asset) {
  const resp = await fetch(asset.browser_download_url, {
    headers: { 'User-Agent': 'FireX-Downloader' },
    redirect: 'follow',
  });
  if (!resp.ok) throw new Error(`下载失败: HTTP ${resp.status}`);

  return new Response(resp.body, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${asset.name}"`,
      'Content-Length': String(asset.size),
    },
  });
}
