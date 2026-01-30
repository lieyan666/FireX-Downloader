/**
 * GitHub Release 相关配置
 */

export const GITHUB_API = 'https://api.github.com';
export const CACHE_TTL = 300;

// v2rayNG (Android) 架构
export const NG_ARCHS = [
  { value: 'arm64', label: 'arm64-v8a', desc: '推荐 · 主流手机', pattern: 'arm64-v8a' },
  { value: 'arm', label: 'armeabi-v7a', desc: '旧款 32 位手机', pattern: 'armeabi-v7a' },
  { value: 'x86_64', label: 'x86_64', desc: '模拟器 / x86 设备', pattern: 'x86_64' },
  { value: 'x86', label: 'x86', desc: '32 位模拟器', pattern: 'x86' },
  { value: 'universal', label: 'universal', desc: '通用 · 体积较大', pattern: 'universal' },
];

// v2rayN (PC) 平台和架构
export const N_PLATFORMS = [
  { value: 'windows', label: 'Windows', icon: 'windows' },
  { value: 'linux', label: 'Linux', icon: 'linux' },
  { value: 'macos', label: 'macOS', icon: 'apple' },
];

export const N_VARIANTS = {
  windows: {
    x64: [
      { id: 'wpf', pattern: 'v2rayN-windows-64.zip', label: '.NET 依赖版', desc: '需安装 .NET 8.0 Desktop Runtime，体积最小' },
      { id: 'self', pattern: 'v2rayN-windows-64-SelfContained.zip', label: '独立版', desc: '免装运行时，开箱即用' },
      { id: 'desktop', pattern: 'v2rayN-windows-64-desktop.zip', label: 'Avalonia UI 版', desc: '跨平台 UI 框架，新界面' },
    ],
    arm64: [
      { id: 'wpf', pattern: 'v2rayN-windows-arm64.zip', label: '.NET 依赖版', desc: '需安装 .NET 8.0 Desktop Runtime' },
      { id: 'desktop', pattern: 'v2rayN-windows-arm64-desktop.zip', label: 'Avalonia UI 版', desc: '跨平台 UI 框架，新界面' },
    ],
  },
  linux: {
    x64: [
      { id: 'zip', pattern: 'v2rayN-linux-64.zip', label: 'ZIP 便携版', desc: '解压即用，独立目录' },
      { id: 'deb', pattern: 'v2rayN-linux-64.deb', label: 'DEB 安装包', desc: 'Debian / Ubuntu 系统' },
    ],
    arm64: [
      { id: 'zip', pattern: 'v2rayN-linux-arm64.zip', label: 'ZIP 便携版', desc: '解压即用，独立目录' },
      { id: 'deb', pattern: 'v2rayN-linux-arm64.deb', label: 'DEB 安装包', desc: 'Debian / Ubuntu 系统' },
    ],
  },
  macos: {
    x64: [
      { id: 'zip', pattern: 'v2rayN-macos-64.zip', label: 'ZIP 版', desc: '解压后运行' },
      { id: 'dmg', pattern: 'v2rayN-macos-64.dmg', label: 'DMG 安装包', desc: '拖入 Applications 安装' },
    ],
    arm64: [
      { id: 'zip', pattern: 'v2rayN-macos-arm64.zip', label: 'ZIP 版', desc: '解压后运行' },
      { id: 'dmg', pattern: 'v2rayN-macos-arm64.dmg', label: 'DMG 安装包', desc: '拖入 Applications 安装' },
    ],
  },
};

// 文件说明 wiki 内容
export const N_NOTES = {
  windows: {
    requirements: 'Windows 10+',
    notes: [
      '.NET 依赖版体积小，但需要先安装 <a href="https://dotnet.microsoft.com/download/dotnet/8.0" target="_blank">.NET 8.0 Desktop Runtime</a>',
      '独立版 (SelfContained) 已内置运行时，无需额外安装',
      'Avalonia UI 版使用全新跨平台界面框架',
    ],
  },
  linux: {
    requirements: 'Debian 12+ / Ubuntu 22.04+ / Fedora 36+ / RHEL 9+',
    notes: [
      'ZIP 为便携版，解压后独立运行',
      'DEB 包使用 <code>sudo dpkg -i xxx.deb</code> 安装',
    ],
  },
  macos: {
    requirements: 'macOS 12+',
    notes: [
      '由于未签名，首次运行可能提示"已损坏"',
      '安装后执行: <code>xattr -cr /Applications/v2rayN.app</code>',
    ],
  },
};
