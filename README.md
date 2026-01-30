# FireX-Downloader

Cloudflare Worker 代理下载 v2rayNG APK，支持选择 Latest / Pre-release 版本和不同架构。

## 功能

- 选择 Release 类型（Latest 稳定版 / Pre-release 预览版）
- 选择 APK 架构（arm64 / arm / x86_64 / x86 / universal）
- GitHub API 结果缓存（5 分钟）
- 流式代理下载，不占用 Worker 内存

## 部署

### 1. 安装 Wrangler

```bash
npm install -g wrangler
```

### 2. 登录 Cloudflare

```bash
wrangler login
```

### 3. 部署

```bash
wrangler deploy
```

## API

### GET /

返回前端页面。

### GET /api/info

获取版本信息。

**参数:**
- `release`: `latest` (默认) 或 `pre-release`
- `arch`: `arm64` (默认), `arm`, `x86`, `x86_64`, `universal`

**返回:**
```json
{
  "version": "2.0.7",
  "filename": "v2rayNG_2.0.7_arm64-v8a.apk",
  "size": 27463680,
  "downloadUrl": "https://github.com/...",
  "publishedAt": "2025-01-29T...",
  "prerelease": false
}
```

### GET /api/download

流式代理下载 APK 文件。参数同上。

## 配置

可在 `wrangler.toml` 中修改环境变量：

```toml
[vars]
GITHUB_REPO = "2dust/v2rayNG"
```

## License

MIT
