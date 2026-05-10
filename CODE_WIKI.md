# Code Wiki - Personal Portfolio Website

> 本文档是项目 `personal-website` 的完整 Code Wiki，涵盖架构、模块、组件、依赖及运行方式。

---

## 目录

1. [项目概述](#1-项目概述)
2. [技术栈与依赖](#2-技术栈与依赖)
3. [项目结构](#3-项目结构)
4. [核心模块详解](#4-核心模块详解)
   - 4.1 [App Router 入口](#41-app-router-入口)
   - 4.2 [主题系统 (Theme Provider)](#42-主题系统-theme-provider)
   - 4.3 [国际化系统 (Language Provider)](#43-国际化系统-language-provider)
   - 4.4 [导航栏 (Navbar)](#44-导航栏-navbar)
   - 4.5 [页脚 (Footer)](#45-页脚-footer)
   - 4.6 [区块标题 (SectionTitle)](#46-区块标题-sectiontitle)
   - 4.7 [页面区块 (Sections)](#47-页面区块-sections)
5. [关键类型与接口](#5-关键类型与接口)
6. [样式系统](#6-样式系统)
7. [部署与运维](#7-部署与运维)
8. [开发指南](#8-开发指南)
9. [文件索引](#9-文件索引)

---

## 1. 项目概述

| 属性 | 说明 |
|------|------|
| **项目名称** | `personal-website` |
| **版本** | `0.1.0` |
| **类型** | 静态个人作品集网站 (Portfolio) |
| **框架** | Next.js 14 (App Router) + React 18 + TypeScript |
| **样式** | Tailwind CSS 3.4 |
| **动画** | Framer Motion |
| **部署目标** | Cloudflare Pages / Vercel / Docker + Nginx |
| **输出模式** | 静态导出 (`output: 'export'`) |

### 核心特性

- **暗黑/亮色主题切换**：基于 `next-themes` + CSS Variables，零闪烁切换
- **中英双语支持**：自研轻量 i18n 方案（Context + 嵌套 key 查找）
- **响应式设计**：三级断点适配（sm:640px, md:768px, lg:1024px），移动端基础字号 17px
- **Framer Motion 动画**：入场动画、交互动画、循环背景动画
- **零服务器成本**：静态导出，首屏加载约 136 KB

---

## 2. 技术栈与依赖

### 生产依赖 (dependencies)

| 包名 | 版本 | 用途 |
|------|------|------|
| `next` | `^14.2.35` | React 全栈框架，App Router |
| `react` | `^18.3.1` | UI 库 |
| `react-dom` | `^18.3.1` | React DOM 渲染 |
| `typescript` | `^5.7.3` | 类型系统 |
| `tailwindcss` | `^3.4.17` | 原子化 CSS 框架 |
| `framer-motion` | `^11.18.2` | 动画库 |
| `lucide-react` | `^0.460.0` | 图标库 |
| `next-themes` | `^0.4.6` | 主题管理 |
| `autoprefixer` | `^10.5.0` | CSS 后处理 |
| `postcss` | `^8.5.13` | CSS 处理工具 |
| `eslint` | `^8.57.0` | 代码检查 |
| `eslint-config-next` | `^14.2.35` | Next.js ESLint 配置 |

### 开发依赖 (devDependencies)

| 包名 | 版本 | 用途 |
|------|------|------|
| `@types/node` | `^20.17.30` | Node.js 类型 |
| `@types/react` | `^18.3.18` | React 类型 |
| `@types/react-dom` | `^18.3.5` | React DOM 类型 |

### 部署/运维工具

| 工具 | 用途 |
|------|------|
| Docker + Nginx | 容器化部署 |
| GitHub Actions | Lighthouse CI 性能检测 |
| Cloudflare Pages | 主要部署平台（全球 CDN） |
| Vercel | 备选部署平台 |

---

## 3. 项目结构

```
personal-website/
├── .github/
│   └── workflows/
│       └── lighthouse.yml          # GitHub Actions: Lighthouse CI
├── public/
│   ├── index.html                  # 备用入口
│   └── resume.pdf                  # 简历 PDF
├── src/
│   ├── app/
│   │   ├── globals.css             # 全局样式 + CSS Variables
│   │   ├── layout.tsx              # 根布局 (RootLayout)
│   │   └── page.tsx                # 首页 (Home)
│   ├── components/
│   │   ├── Footer.tsx              # 页脚组件
│   │   ├── Navbar.tsx              # 导航栏组件
│   │   ├── SectionTitle.tsx        # 区块标题组件
│   │   ├── language-provider.tsx   # 国际化 Context Provider
│   │   └── theme-provider.tsx      # 主题 Context Provider
│   └── sections/
│       ├── About.tsx               # 关于我
│       ├── Contact.tsx             # 联系方式
│       ├── Experience.tsx          # 实习经历
│       ├── Hero.tsx                # 首页 Hero
│       ├── Honors.tsx              # 荣誉奖项
│       ├── Projects.tsx            # 项目经历
│       └── Skills.tsx              # 技能栈
├── .dockerignore                   # Docker 忽略文件
├── .gitignore                      # Git 忽略文件
├── .lighthouserc.json              # Lighthouse CI 配置
├── Dockerfile                      # Docker 构建文件
├── docker-compose.yml              # Docker Compose 配置
├── next.config.mjs                 # Next.js 配置
├── nginx.conf                      # Nginx 配置
├── package.json                    # 项目依赖
├── postcss.config.js               # PostCSS 配置
├── tailwind.config.js              # Tailwind CSS 配置
├── tsconfig.json                   # TypeScript 配置
└── vercel.json                     # Vercel 部署配置
```

---

## 4. 核心模块详解

### 4.1 App Router 入口

#### `src/app/layout.tsx`

**职责**：根布局组件，包裹所有页面，提供全局的 ThemeProvider、LanguageProvider、Navbar 和 Footer。

**关键代码**：

```tsx
export const metadata: Metadata = {
  title: '卢锡远 - Agent 应用开发实习生',
  description: '专注于 LLM 应用开发与 Agent 系统构建...',
  keywords: ['卢锡远', 'Agent开发', 'LLM', 'RAG', ...],
  openGraph: { ... },
  twitter: { ... },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <LanguageProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**要点**：
- `suppressHydrationWarning`：抑制主题切换时的 hydration 不匹配警告
- `defaultTheme="dark"`：默认暗黑模式
- SEO 元数据完整配置（title, description, keywords, OG, Twitter Card, robots）

#### `src/app/page.tsx`

**职责**：首页组件，按顺序组合所有页面区块。

```tsx
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Honors />
      <Contact />
    </>
  )
}
```

---

### 4.2 主题系统 (Theme Provider)

**文件**：`src/components/theme-provider.tsx`

**职责**：封装 `next-themes`，提供主题切换能力，处理 SSR 水合问题。

**实现要点**：
- 使用 `mounted` 状态避免服务端/客户端渲染不一致
- 未挂载时直接返回 children，避免闪烁
- 支持 `class` 属性策略（与 Tailwind `darkMode: 'class'` 配合）

**使用方式**：
```tsx
import { useTheme } from 'next-themes'
const { theme, setTheme } = useTheme()
setTheme(theme === 'dark' ? 'light' : 'dark')
```

---

### 4.3 国际化系统 (Language Provider)

**文件**：`src/components/language-provider.tsx`

**职责**：提供中英双语切换能力，自研轻量 i18n 方案。

**核心类型**：

```typescript
type Language = 'zh' | 'en'

interface Translations {
  [key: string]: string | string[] | Translations
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string | string[] | Translations
}
```

**实现要点**：
- 使用 React Context + `useState` + `useCallback`
- 翻译内容内联在组件中（`zhTranslations` / `enTranslations`）
- 支持嵌套 key 查找（如 `t('nav.home')`）
- 切换语言时同步更新 `document.documentElement.lang`
- 提供 `useLanguage()` Hook 供子组件使用

**翻译数据结构**：
```typescript
const zhTranslations = {
  nav: { home: '首页', about: '关于我', ... },
  hero: { greeting: '你好，我是', title: '...', ... },
  about: { title: '关于我', description: '...', selfEval: [...] },
  // ...
}
```

---

### 4.4 导航栏 (Navbar)

**文件**：`src/components/Navbar.tsx`

**职责**：顶部固定导航栏，支持滚动样式变化、主题切换、语言切换、移动端菜单。

**状态管理**：
- `isScrolled`: 监听滚动事件，滚动超过 20px 时添加背景模糊效果
- `isMobileMenuOpen`: 控制移动端菜单展开/收起
- `theme`: 来自 `useTheme()`
- `language`: 来自 `useLanguage()`

**导航链接配置**：
```typescript
const navLinks = [
  { href: '#home', label: '首页' },
  { href: '#about', label: '关于我' },
  { href: '#skills', label: '技能栈' },
  { href: '#projects', label: '项目经历' },
  { href: '#experience', label: '实习经历' },
  { href: '#honors', label: '荣誉' },
  { href: '#contact', label: '联系方式' },
]
```

**特性**：
- Framer Motion 入场动画（从顶部滑入）
- 滚动时背景变为 `bg-background/80 backdrop-blur-md`
- 主题切换按钮带旋转动画（Sun/Moon 图标切换）
- 移动端汉堡菜单带展开/收起动画

---

### 4.5 页脚 (Footer)

**文件**：`src/components/Footer.tsx`

**职责**：页面底部，包含 Logo、社交媒体链接、版权信息。

**内容**：
- 左侧：Portfolio Logo + "Made with ❤️ and Next.js"
- 中间：GitHub 链接图标
- 右侧：版权信息 `© {currentYear} Portfolio. All rights reserved`

**动画**：使用 `whileInView` 实现滚动进入时的淡入动画。

---

### 4.6 区块标题 (SectionTitle)

**文件**：`src/components/SectionTitle.tsx`

**职责**：统一的区块标题组件，带渐变文字和底部装饰线。

**Props 接口**：
```typescript
interface SectionTitleProps {
  title: string        // 标题文字
  subtitle?: string    // 副标题（可选）
  centered?: boolean   // 是否居中，默认 true
}
```

**样式**：
- 标题：`bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent`
- 底部装饰线：渐变色的圆角横条，宽度 20

---

### 4.7 页面区块 (Sections)

#### 4.7.1 Hero (`src/sections/Hero.tsx`)

**职责**：首屏展示，包含个人介绍、CTA 按钮、滚动提示。

**内容结构**：
1. 问候语：`你好，我是`
2. 姓名：`卢锡远`（渐变大字）
3. 职位：`大模型应用开发工程师 / AI Agent开发工程师`
4. 元信息：`24岁 · 可立即到岗`
5. 副标题：`专注于 LLM 应用开发与 Agent 系统构建`
6. CTA 按钮：`查看项目` / `联系我`
7. 简历下载链接
8. 底部滚动提示箭头（循环动画）

**背景效果**：
- 两个模糊圆形（`blur-3xl`）做循环缩放/透明度动画

#### 4.7.2 About (`src/sections/About.tsx`)

**职责**：个人简介和教育背景。

**内容**：
- 左侧：SVG 头像（渐变圆形 + 椭圆组合）
- 右侧：
  - 个人简介段落
  - 教育背景卡片（东北大学 / 电子信息工程 / 本科 / 2020-2024）
  - 核心优势列表（4 条，带悬停缩放动画）

#### 4.7.3 Skills (`src/sections/Skills.tsx`)

**职责**：技能栈展示，按分类和熟练度分组。

**核心类型**：
```typescript
type SkillLevel = 'expert' | 'proficient' | 'familiar'

interface Skill {
  name: string      // 中文名
  nameEn: string    // 英文名
  level: SkillLevel
}

interface SkillCategory {
  icon: typeof Brain  // Lucide 图标
  label: string       // 分类 key
  skills: Skill[]
}
```

**技能分类**：
| 分类 | 图标 | 技能数量 |
|------|------|----------|
| AI / 大模型 | Brain | 7 |
| 后端开发 | Server | 6 |
| 前端开发 | Code2 | 4 |
| 工具与平台 | Wrench | 5 |

**熟练度标签样式**：
- `expert`（精通）：`bg-primary-500/20 text-primary-300`
- `proficient`（熟练）：`bg-primary-500/10 text-primary-400/80`
- `familiar`（了解）：`bg-secondary text-muted-foreground`

#### 4.7.4 Projects (`src/sections/Projects.tsx`)

**职责**：项目经历展示，支持卡片悬停效果和详情弹窗。

**项目数据结构**：
```typescript
interface Project {
  id: number
  title: string        // 中文标题
  titleEn: string      // 英文标题
  description: string  // 中文描述
  descriptionEn: string
  tags: string[]       // 技术标签
  emoji: string        // 项目图标
  github: string       // GitHub 链接
  demo: string         // 在线演示链接
  features: string[]   // 中文特性列表
  featuresEn: string[] // 英文特性列表
}
```

**项目列表**：
| # | 项目 | 技术标签 |
|---|------|----------|
| 1 | 智能网络运维助手 | Python, FastAPI, React, RAG, Agent, Go |
| 2 | 视频名场面智能检测系统 | Python, FastAPI, Qwen-VL, FFmpeg, Agent |
| 3 | SteganoGAN-Transformer | Python, PyTorch, Deep Learning |
| 4 | 个人作品集网站 | Next.js, TypeScript, Tailwind CSS, Framer Motion |

**交互**：
- 卡片悬停：显示渐变遮罩层 + GitHub/演示链接按钮
- 点击卡片：打开详情弹窗（ProjectModal），展示完整描述和特性列表

#### 4.7.5 Experience (`src/sections/Experience.tsx`)

**职责**：实习经历展示。

**数据结构**：
```typescript
interface Experience {
  id: number
  company: string
  companyEn: string
  position: string
  positionEn: string
  location: string
  locationEn: string
  startDate: string
  endDate: string
  description: string
  descriptionEn: string
  achievements: string[]
  achievementsEn: string[]
}
```

**内容**：当虹科技 AI应用开发实习生（2026-04 至今）

#### 4.7.6 Honors (`src/sections/Honors.tsx`)

**职责**：荣誉奖项列表。

**数据**：
1. 东北大学计算机科学与工程学院优秀学生奖学金（2020-2024）
2. 第五届"云支教"志愿活动，累计 86 小时科普宣讲（2023）

#### 4.7.7 Contact (`src/sections/Contact.tsx`)

**职责**：联系方式展示和联系表单。

**布局**：两栏布局
- 左侧：联系信息（邮箱、电话、地点）+ GitHub 链接
- 右侧：联系表单（姓名、邮箱、消息）

**表单处理**：
- 表单提交时通过 `mailto:` 协议打开用户邮箱客户端
- 预填充主题和正文内容

---

## 5. 关键类型与接口

### 5.1 翻译系统类型

```typescript
// src/components/language-provider.tsx
type Language = 'zh' | 'en'

interface Translations {
  [key: string]: string | string[] | Translations
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string | string[] | Translations
}
```

### 5.2 技能系统类型

```typescript
// src/sections/Skills.tsx
type SkillLevel = 'expert' | 'proficient' | 'familiar'

interface Skill {
  name: string
  nameEn: string
  level: SkillLevel
}

interface SkillCategory {
  icon: typeof Brain
  label: string
  skills: Skill[]
}
```

### 5.3 组件 Props

```typescript
// src/components/SectionTitle.tsx
interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean
}
```

---

## 6. 样式系统

### 6.1 Tailwind CSS 配置

**文件**：`tailwind.config.js`

**关键配置**：
- `darkMode: 'class'`：通过 class 切换暗黑模式
- `content`：扫描 `src/pages`, `src/components`, `src/app`, `src/sections` 下的文件
- 自定义颜色：使用 CSS Variables（`hsl(var(--primary))`）+ 固定色阶（`primary-50` 到 `primary-900`）
- 自定义动画：`fade-in`, `slide-up`
- 自定义圆角：`lg: var(--radius)`, `md: calc(var(--radius) - 2px)`

### 6.2 CSS Variables

**文件**：`src/app/globals.css`

**亮色模式** (`:root`)：
```css
--background: 0 0% 100%
--foreground: 222.2 84% 4.9%
--primary: 201 96% 32%
--primary-foreground: 210 40% 98%
--border: 214.3 31.8% 91.4%
--radius: 0.5rem
```

**暗黑模式** (`.dark`)：
```css
--background: 222.2 84% 4.9%
--foreground: 210 40% 98%
--primary: 201 96% 32%
```

### 6.3 自定义动画

```css
/* 入场动画类 */
.animate-in-up    /* 从下方淡入 */
.animate-in-left  /* 从左方淡入 */
.animate-in-right /* 从右方淡入 */

/* 关键帧 */
@keyframes fadeInUp    { from { opacity: 0; transform: translateY(24px) } }
@keyframes fadeInLeft  { from { opacity: 0; transform: translateX(-40px) } }
@keyframes fadeInRight { from { opacity: 0; transform: translateX(40px) } }
```

### 6.4 滚动条样式

```css
::-webkit-scrollbar { width: 8px }
::-webkit-scrollbar-track { background: transparent }
::-webkit-scrollbar-thumb { background: hsl(var(--muted-foreground)); border-radius: 4px }
```

---

## 7. 部署与运维

### 7.1 Next.js 配置

**文件**：`next.config.mjs`

```javascript
const nextConfig = {
  output: 'export',      // 静态导出
  images: {
    unoptimized: true,   // 禁用图片优化（静态导出需要）
  },
}
```

### 7.2 Docker 部署

**文件**：`Dockerfile`

多阶段构建：
1. **Builder 阶段** (`node:18-alpine`)：安装依赖并执行 `npm run build`
2. **Runtime 阶段** (`nginx:alpine`)：复制构建产物到 Nginx 目录

**文件**：`nginx.conf`

- 监听 80 端口
- SPA 路由支持：`try_files $uri $uri.html $uri/ /index.html`
- 静态资源缓存：JS/CSS/图片等缓存 1 年
- Gzip 压缩：文本资源启用 gzip

**文件**：`docker-compose.yml`

- 端口映射：`3000:3000`
- 健康检查：每 30 秒检查一次 HTTP 响应
- 自动重启策略：`unless-stopped`

### 7.3 Vercel 部署

**文件**：`vercel.json`

```json
{ "version": 2, "public": true }
```

### 7.4 CI/CD

**文件**：`.github/workflows/lighthouse.yml`

- 触发条件：`push` 或 `pull_request` 到 `main` 分支
- 步骤：
  1. Checkout 代码
  2. 设置 Node.js 18
  3. `npm ci` 安装依赖
  4. `npm run build` 构建
  5. 运行 Lighthouse CI 性能检测
  6. 上传检测报告

---

## 8. 开发指南

### 8.1 安装依赖

```bash
npm install
```

### 8.2 开发模式

```bash
npm run dev
```
- 启动 Next.js 开发服务器
- 默认端口：3000
- 支持热更新

### 8.3 构建

```bash
npm run build
```
- 执行静态导出
- 输出目录：`out/`

### 8.4 生产启动

```bash
npm start
```

### 8.5 代码检查

```bash
npm run lint
```

### 8.6 Docker 构建与运行

```bash
# 构建镜像
docker build -t personal-website .

# 运行容器
docker-compose up -d
```

### 8.7 添加新页面区块

1. 在 `src/sections/` 下创建新组件（如 `NewSection.tsx`）
2. 在 `src/app/page.tsx` 中导入并添加组件
3. 在 `src/components/Navbar.tsx` 的 `navLinks` 中添加导航链接
4. 在 `src/components/language-provider.tsx` 的翻译对象中添加对应文案

### 8.8 添加翻译内容

1. 打开 `src/components/language-provider.tsx`
2. 在 `zhTranslations` 和 `enTranslations` 中添加对应的 key-value
3. 使用 `t('your.new.key')` 在组件中获取翻译

---

## 9. 文件索引

### 配置文件

| 文件 | 用途 |
|------|------|
| `package.json` | 项目依赖与脚本 |
| `tsconfig.json` | TypeScript 编译配置 |
| `next.config.mjs` | Next.js 框架配置 |
| `tailwind.config.js` | Tailwind CSS 配置 |
| `postcss.config.js` | PostCSS 处理配置 |
| `vercel.json` | Vercel 部署配置 |
| `.lighthouserc.json` | Lighthouse CI 配置 |

### 源代码文件

| 文件 | 类型 | 职责 |
|------|------|------|
| `src/app/layout.tsx` | Layout | 根布局，提供全局 Provider |
| `src/app/page.tsx` | Page | 首页，组合所有区块 |
| `src/app/globals.css` | Style | 全局样式与 CSS Variables |
| `src/components/theme-provider.tsx` | Component | 主题切换 Provider |
| `src/components/language-provider.tsx` | Component | 国际化 Provider |
| `src/components/Navbar.tsx` | Component | 顶部导航栏 |
| `src/components/Footer.tsx` | Component | 页脚 |
| `src/components/SectionTitle.tsx` | Component | 区块标题 |
| `src/sections/Hero.tsx` | Section | 首屏展示 |
| `src/sections/About.tsx` | Section | 关于我 |
| `src/sections/Skills.tsx` | Section | 技能栈 |
| `src/sections/Projects.tsx` | Section | 项目经历 |
| `src/sections/Experience.tsx` | Section | 实习经历 |
| `src/sections/Honors.tsx` | Section | 荣誉奖项 |
| `src/sections/Contact.tsx` | Section | 联系方式 |

### 部署文件

| 文件 | 用途 |
|------|------|
| `Dockerfile` | Docker 镜像构建 |
| `docker-compose.yml` | Docker Compose 编排 |
| `nginx.conf` | Nginx 服务器配置 |
| `deploy.sh` | 部署脚本 (Shell) |
| `deploy.ps1` | 部署脚本 (PowerShell) |
| `.github/workflows/lighthouse.yml` | GitHub Actions CI |

---

> 本文档最后更新：2026-05-05
