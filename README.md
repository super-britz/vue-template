# vue-template

基于 Vue 3 + Vite 的中后台前端项目模板。

## 技术栈

- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **UI 组件库**: Element Plus
- **CSS 方案**: Tailwind CSS 4
- **状态管理**: Pinia
- **路由**: Vue Router
- **HTTP 请求**: Axios
- **时间处理**: Day.js

## 项目结构

```
src/
├── api/            # 接口请求与认证
├── assets/         # 静态资源
├── components/     # 公共组件
├── directives/     # 自定义指令（权限等）
├── layouts/        # 布局组件
├── router/         # 路由配置与导航守卫
├── stores/         # Pinia 状态管理
├── types/          # 类型定义
├── utils/          # 工具函数
└── views/          # 页面视图
```

## 主要功能

- OAuth2 登录认证
- 基于 authorities 的菜单与按钮级权限控制
- 侧边栏 + 顶栏布局
- Auto Import（Vue API、组件、工具函数自动导入）
- Mock Dev Server 支持
- Gzip / Brotli 压缩

## 开发环境要求

- Node.js ^20.19.0 || >=22.12.0
- pnpm

## 快速开始

```sh
# 安装依赖
pnpm install

# 启动开发服务器（端口 18000）
pnpm dev

# 类型检查 + 构建
pnpm build

# 预览构建产物
pnpm preview
```

## 代码质量

```sh
# Lint（oxlint + eslint）
pnpm lint

# 格式化
pnpm format
```

项目使用 Husky + lint-staged 在提交时自动执行 lint 和格式化，并通过 commitlint 规范提交信息。

## 测试

```sh
# 单元测试
pnpm test:unit

# E2E 测试（Playwright）
npx playwright install   # 首次需安装浏览器
pnpm test:e2e
```
