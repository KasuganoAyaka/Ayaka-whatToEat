<h1 align="center">
  <img src="./public/logo.png" alt="Ayaka Eat logo" width="44" />
  Ayaka Eat
</h1>

<p align="center">
  <img src="./docs/assets/readme-banner.png" alt="Ayaka Eat banner" width="100%" />
</p>

<p align="center">
  <strong>一个带有 二次元气息 的吃饭决策小站，支持分类筛选、随机抽取、食谱跳转和轻玻璃感主题界面。</strong>
</p>

<p align="center">
  <a href="https://eat.ayakacloud.cn/"><img alt="在线主页" src="https://img.shields.io/badge/%E5%9C%A8%E7%BA%BF%E4%B8%BB%E9%A1%B5-EAF7F6?style=for-the-badge&logo=vercel&logoColor=39C5BB&labelColor=EAF7F6&color=39C5BB" /></a>
  <a href="https://github.com/KasuganoAyaka/whatToEat"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-EEF2FF?style=for-the-badge&logo=github&logoColor=667EEA&labelColor=EEF2FF&color=667EEA" /></a>
</p>

<p align="center">
  <a href="https://app.netlify.com/start/deploy?repository=https://github.com/KasuganoAyaka/whatToEat"><img alt="Deploy to Netlify" src="https://www.netlify.com/img/deploy/button.svg" /></a>
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/KasuganoAyaka/whatToEat"><img alt="Deploy with Vercel" src="https://vercel.com/button" /></a>
</p>

<p align="center">
  <a href="https://nuxt.com/"><img alt="Nuxt 4" src="https://img.shields.io/badge/Nuxt_4-69C9D0?style=for-the-badge&logo=nuxt&logoColor=white" /></a>
  <a href="https://vuejs.org/"><img alt="Vue 3" src="https://img.shields.io/badge/Vue_3-39C5BB?style=for-the-badge&logo=vuedotjs&logoColor=white" /></a>
  <a href="https://pinia.vuejs.org/"><img alt="Pinia" src="https://img.shields.io/badge/Pinia-FFB74D?style=for-the-badge&logo=pinia&logoColor=white" /></a>
  <a href="https://unocss.dev/"><img alt="UnoCSS" src="https://img.shields.io/badge/UnoCSS-7AA8FF?style=for-the-badge&logo=css&logoColor=white" /></a>
  <a href="https://nodejs.org/"><img alt="Node 22" src="https://img.shields.io/badge/Node_22-F6A6B2?style=for-the-badge&logo=nodedotjs&logoColor=white" /></a>
  <a href="./LICENSE"><img alt="MIT" src="https://img.shields.io/badge/MIT-4B4B4B?style=for-the-badge" /></a>
</p>

<p align="center">
  分类筛选 • 随机抽取 • 食谱跳转 • Bilibili 搜索 • Ayaka 主题化界面
</p>

## 站点简介

> Ayaka Eat 是一个围绕“今天吃什么”这个日常问题搭建的小型 Nuxt 应用。把分类筛选、随机决策、原始菜谱入口和轻量交互组合在一起，做成一个更适合日常快速打开使用的小站。

## 功能分区

<table>
  <tr>
    <td width="50%" valign="top">
      <strong>随机决策</strong><br />
      一键开始抽取、自动停下、保留结果、减轻选择困难
    </td>
    <td width="50%" valign="top">
      <strong>分类筛选</strong><br />
      按菜品分类收窄范围，让结果更贴近当下胃口
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <strong>内容跳转</strong><br />
      直达原始菜谱页面，并可跳转到 Bilibili 搜索相关做法
    </td>
  </tr>
</table>

## 风格方向

<table>
  <tr>
    <td width="50%" valign="top">
      <strong>主强调色</strong><br />
      青绿色 <code>#39c5bb</code> 作为主要视觉点缀
    </td>
    <td width="50%" valign="top">
      <strong>次级渐变</strong><br />
      柔和蓝色渐变用于标题、按钮和发光细节
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <strong>界面语言</strong><br />
      大圆角、轻玻璃态、留白宽松、信息层次轻盈
    </td>
    <td width="50%" valign="top">
      <strong>产品气质</strong><br />
      日常、安静、轻二次元、适合快速打开即用
    </td>
  </tr>
</table>

## 技术栈

<table>
  <tr>
    <td width="20%" valign="top"><strong>框架</strong></td>
    <td width="80%" valign="top">Nuxt 4、Vue 3、Nitro</td>
  </tr>
  <tr>
    <td width="20%" valign="top"><strong>状态与工具</strong></td>
    <td width="80%" valign="top">Pinia、VueUse、TypeScript</td>
  </tr>
  <tr>
    <td width="20%" valign="top"><strong>样式系统</strong></td>
    <td width="80%" valign="top">UnoCSS、自定义主题变量、玻璃态卡片样式</td>
  </tr>
  <tr>
    <td width="20%" valign="top"><strong>运行环境</strong></td>
    <td width="80%" valign="top">Node.js 22、pnpm 10</td>
  </tr>
</table>

## 目录结构

```text
whatToEat/
├─ app/            # 页面、组件、主题样式与应用配置
├─ public/         # 静态资源、logo、recipes.json
├─ server/         # 服务端 API 路由
├─ scripts/        # 辅助脚本
├─ nuxt.config.ts  # Nuxt 主配置
└─ package.json
```

## 启动这个小站

### 1. 环境要求

- Node.js 22+
- pnpm 10+

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发环境

```bash
pnpm dev
```

默认本地地址：

```text
http://localhost:3000
```

### 4. 生产构建

```bash
pnpm build
```

### 5. 本地预览生产包

```bash
pnpm start
```

## 部署方式

> 当前项目更推荐部署为 Node.js SSR 服务，通过 PM2、systemd 常驻运行，再由 Nginx 反向代理到 3000 端口。

### 手动服务器部署

生产环境常见启动方式：

```bash
pnpm install --frozen-lockfile
pnpm build
node .output/server/index.mjs
```

如果你使用 PM2：

```bash
pm2 start .output/server/index.mjs --name ayaka-eat
```

## 数据来源

> 菜谱数据来自仓库中的 `public/recipes.json`，服务端通过 `server/routes/api/recipes.ts` 读取并整理分类、数量和名称列表，再提供给前端使用。

## 常用文件

<table>
  <tr>
    <td width="34%" valign="top"><code>app/components/Eat.vue</code></td>
    <td width="66%" valign="top">首页主界面、随机逻辑与页面结构</td>
  </tr>
  <tr>
    <td width="34%" valign="top"><code>app/components/Loading.vue</code></td>
    <td width="66%" valign="top">主题化加载界面</td>
  </tr>
  <tr>
    <td width="34%" valign="top"><code>server/routes/api/recipes.ts</code></td>
    <td width="66%" valign="top">服务端菜谱数据接口</td>
  </tr>
  <tr>
    <td width="34%" valign="top"><code>nuxt.config.ts</code></td>
    <td width="66%" valign="top">站点 head、模块与运行配置</td>
  </tr>
  <tr>
    <td width="34%" valign="top"><code>public/recipes.json</code></td>
    <td width="66%" valign="top">菜谱静态数据源</td>
  </tr>
</table>

## 参考项目

- [HowToCook](https://github.com/Anduin2017/HowToCook)
- [HowToCook-mcp](https://github.com/worryzyy/HowToCook-mcp)

## License

本项目基于 MIT License 开源，具体内容请参见 [LICENSE](./LICENSE) 文件。
