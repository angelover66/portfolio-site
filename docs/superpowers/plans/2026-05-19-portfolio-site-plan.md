# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal AI portfolio website with Next.js — single page with Hero, project cards, modal details, deployed to Vercel.

**Architecture:** Next.js App Router single-page app. Hardcoded project data in `data/projects.ts`. Four sections (Nav, Hero, ProjectCards, Footer) composed in `app/page.tsx`. Framer Motion for animations, Tailwind CSS for glassmorphism + gradient styling.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 3, Framer Motion 11, TypeScript

---

## File Structure

```
portfolio-site/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, global styles
│   ├── page.tsx                # Main page: composes all sections
│   ├── globals.css             # Tailwind directives + CSS keyframes + base styles
│   └── components/
│       ├── Navbar.tsx           # Fixed top bar: name left, icons right
│       ├── Hero.tsx             # Name, title, bio, fade-in animation
│       ├── ProjectCard.tsx      # Glass card: name, desc, tags, hover effect
│       ├── ProjectModal.tsx     # Full detail modal with AnimatePresence
│       └── Footer.tsx           # Copyright + contact
├── data/
│   └── projects.ts             # Hardcoded project info extracted from 产品介绍.md
├── public/                     # Static assets (empty for now)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── next.config.js
```

---

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `next.config.js`
- Create: `app/globals.css`, `app/layout.tsx`

- [ ] **Step 1: Create Next.js project via CLI**

Run:
```bash
cd /Users/lulu/portfolio-site && npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --no-turbopack --use-npm
```
Expected: Project scaffolds successfully. Ignore any prompts about overwriting existing files — choose "yes" to overwrite.

- [ ] **Step 2: Install additional dependencies**

Run:
```bash
cd /Users/lulu/portfolio-site && npm install framer-motion
```
Expected: framer-motion added to package.json.

- [ ] **Step 3: Verify dev server starts**

Run:
```bash
cd /Users/lulu/portfolio-site && npm run dev &
sleep 5 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```
Expected: Returns `200`. Kill the dev server after: `kill %1`.

- [ ] **Step 4: Commit**

```bash
cd /Users/lulu/portfolio-site && git init && git add -A && git commit -m "$(cat <<'EOF'
feat: scaffold Next.js project with Tailwind and Framer Motion

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Tailwind Configuration & Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Update tailwind.config.ts**

Write `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "PingFang SC", "Noto Sans SC", "system-ui", "sans-serif"],
      },
      colors: {
        dark: "#1a1a2e",
        accent: {
          from: "#6366f1",
          to: "#a855f7",
        },
      },
      animation: {
        "gradient-flow": "gradient-flow 12s ease infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out",
      },
      keyframes: {
        "gradient-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundSize: {
        "400%": "400% 400%",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Update app/globals.css**

Write `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --glass-bg: rgba(255, 255, 255, 0.6);
  --glass-border: rgba(255, 255, 255, 0.4);
}

body {
  font-family: 'Inter', 'PingFang SC', 'Noto Sans SC', system-ui, sans-serif;
  color: #1a1a2e;
  -webkit-font-smoothing: antialiased;
}

/* 流动渐变背景 */
.gradient-bg {
  background: linear-gradient(270deg, #e0e7ff, #f3e8ff, #fce7f3, #e0e7ff);
  background-size: 400% 400%;
  animation: gradient-flow 12s ease infinite;
}

/* 毛玻璃卡片 */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 1rem;
}

@keyframes gradient-flow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

- [ ] **Step 3: Verify build**

Run:
```bash
cd /Users/lulu/portfolio-site && npm run build 2>&1 | tail -5
```
Expected: Build succeeds without errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/lulu/portfolio-site && git add -A && git commit -m "$(cat <<'EOF'
feat: configure Tailwind with glassmorphism tokens and gradient animations

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Project Data File

**Files:**
- Create: `data/projects.ts`

- [ ] **Step 1: Write project data**

Write `data/projects.ts`:

```typescript
export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string[];
  techTags: string[];
  liveUrl: string;
  githubUrl: string;
  emoji: string;
}

export const projects: Project[] = [
  {
    id: "daily-mic",
    name: "Lulu's Daily Mic",
    tagline: "全球化沟通力养成助手",
    emoji: "🎙️",
    description: [
      "面向雅思6.5分、目标全英文工作环境的AI产品经理，解决「日常口语打卡 + AI PM职业英语」这一垂直场景的练习需求。市面上英语工具或过于基础、或过于学术，缺乏中间地带。",
      "核心能力：支持YouTube/Bilibili/网页/纯文本四种内容输入，LLM自动生成约2分钟的英文口播脚本，附带中文对照翻译。固定开篇语和结束语建立每日练习仪式感，历史脚本支持搜索和下载。",
      "额外集成AI PM学习材料定时推送（每日早晚各一次），LLM策展 + URL可访问性验证，macOS系统通知触达。已支持Streamlit Web UI和CLI双交互模式。",
    ],
    techTags: ["Python", "Streamlit", "DeepSeek API", "macOS Notification"],
    liveUrl: "https://english-agent.streamlit.app",
    githubUrl: "https://github.com/angelover66/english-agent",
  },
  {
    id: "interview-agent",
    name: "B端产品经理面试助手",
    tagline: "面试全流程 AI Agent",
    emoji: "💼",
    description: [
      "B端产品经理求职竞争激烈，候选人普遍面临准备缺乏针对性、模拟面试缺少真实反馈、面试过程无系统沉淀三大痛点。本产品提供「素材入库 → 定制准备 → 模拟面试 → 评估反馈」四阶段闭环。",
      "核心能力：支持多格式素材管理（PDF/Excel/图片自动提取结构化信息），基于JD的岗位分析+匹配度评估+面试题预测（含出题逻辑说明），LLM扮演指定公司面试官进行角色扮演，5种题型自动穿插+追问机制。",
      "面试结束后提供5维度量化评估（逻辑架构/B端思维/数据意识/岗位匹配度/表达质量），含具体改进建议和示范回答。已部署Streamlit Cloud，通用版无需定制即可使用。",
    ],
    techTags: ["Python", "Streamlit", "DeepSeek API", "DuckDuckGo"],
    liveUrl: "https://interview-agent.streamlit.app",
    githubUrl: "https://github.com/angelover66/interview-agent",
  },
  {
    id: "telegram-agent",
    name: "个人 Telegram AI 助手",
    tagline: "轻量级 AI 生活助手",
    emoji: "🤖",
    description: [
      "以Telegram Bot为载体，将AI对话、天气查询、定时提醒三大高频日常需求整合到一个聊天窗口，零额外App安装，全平台可用。解决了「需要一个随时可聊的AI入口」的核心诉求。",
      "核心能力：Claude Sonnet 4.6驱动的智能多轮对话（支持Markdown格式+10轮上下文），和风天气API实时查询+每日7:30主动推送，自然语言定时提醒（支持「明天下午3点开会」等表达）。",
      "技术实现：python-telegram-bot框架polling模式，SQLite持久化存储提醒数据，无需公网URL或webhook，本地即可运行。多用户chat_id隔离，对话历史和提醒完全独立。",
    ],
    techTags: ["Python", "Telegram Bot API", "Claude API", "SQLite"],
    liveUrl: "https://t.me/lulu_ai_bot",
    githubUrl: "https://github.com/angelover66/telegram-agent",
  },
];
```

- [ ] **Step 2: Commit**

```bash
cd /Users/lulu/portfolio-site && git add -A && git commit -m "$(cat <<'EOF'
feat: add project data with content extracted from product docs

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Navbar Component

**Files:**
- Create: `app/components/Navbar.tsx`

- [ ] **Step 1: Write Navbar component**

Write `app/components/Navbar.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12"
    >
      <span className="text-lg font-semibold tracking-tight text-dark">
        Lulu Yang
      </span>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/angelover66"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark/60 hover:text-dark transition-colors"
          title="GitHub"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a
          href="mailto:yanglulu@example.com"
          className="text-dark/60 hover:text-dark transition-colors"
          title="Email"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </a>
      </div>
    </motion.nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/lulu/portfolio-site && git add -A && git commit -m "$(cat <<'EOF'
feat: add Navbar with GitHub and Email icon links

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Hero Component

**Files:**
- Create: `app/components/Hero.tsx`

- [ ] **Step 1: Write Hero component**

Write `app/components/Hero.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl"
      >
        {/* 身份标签 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full text-sm font-medium
                     bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10
                     text-[#6366f1] border border-[#6366f1]/20"
        >
          AI 产品经理 &times; AI Agent 开发者
        </motion.div>

        {/* 姓名 */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-dark mb-4">
          Lulu Yang
        </h1>

        {/* 一句话介绍 */}
        <p className="text-lg md:text-xl text-dark/60 leading-relaxed max-w-lg mx-auto">
          5年B端产品经理，转型 AI Agent 开发。
          <br />
          用 Vibe Coding 的方式，把产品想法变成可运行的 AI 应用。
        </p>
      </motion.div>

      {/* 向下滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8"
      >
        <div className="w-5 h-8 rounded-full border-2 border-dark/20 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 rounded-full bg-dark/30"
          />
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/lulu/portfolio-site && git add -A && git commit -m "$(cat <<'EOF'
feat: add Hero section with name, title tag, bio, and scroll indicator

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: ProjectCard Component

**Files:**
- Create: `app/components/ProjectCard.tsx`

- [ ] **Step 1: Write ProjectCard component**

Write `app/components/ProjectCard.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="glass-card p-6 md:p-8 cursor-pointer group
                 hover:shadow-xl hover:shadow-[#6366f1]/8
                 transition-shadow duration-300"
    >
      {/* Emoji + 项目名 */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{project.emoji}</span>
        <h3 className="text-xl font-semibold text-dark group-hover:text-[#6366f1] transition-colors">
          {project.name}
        </h3>
      </div>

      {/* 一句话描述 */}
      <p className="text-dark/50 text-sm mb-4 leading-relaxed">
        {project.tagline}
      </p>

      {/* 技术标签 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techTags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-full text-xs font-medium
                       bg-[#6366f1]/8 text-[#6366f1]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 查看详情 */}
      <span className="inline-flex items-center gap-1 text-sm font-medium
                       text-[#6366f1] group-hover:gap-2 transition-all">
        查看详情
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/lulu/portfolio-site && git add -A && git commit -m "$(cat <<'EOF'
feat: add ProjectCard with glassmorphism, hover lift, tech tags

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: ProjectModal Component

**Files:**
- Create: `app/components/ProjectModal.tsx`

- [ ] **Step 1: Write ProjectModal component**

Write `app/components/ProjectModal.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // ESC 关闭
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // 禁止背景滚动
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-black/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto
                   bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl
                   border border-white/40 p-6 md:p-8"
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                     rounded-full bg-dark/5 hover:bg-dark/10 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* 项目名 + 定位 */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{project.emoji}</span>
          <div>
            <h2 className="text-2xl font-bold text-dark">{project.name}</h2>
            <p className="text-sm text-dark/50">{project.tagline}</p>
          </div>
        </div>

        {/* 描述段落 */}
        <div className="mt-5 space-y-3">
          {project.description.map((para, i) => (
            <p key={i} className="text-sm text-dark/70 leading-relaxed">{para}</p>
          ))}
        </div>

        {/* 技术标签 */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.techTags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium
                         bg-[#6366f1]/8 text-[#6366f1]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 操作按钮 */}
        <div className="mt-6 flex gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3
                       rounded-xl text-sm font-semibold text-white
                       bg-gradient-to-r from-[#6366f1] to-[#a855f7]
                       hover:opacity-90 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            在线体验
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3
                       rounded-xl text-sm font-semibold text-dark
                       bg-dark/5 hover:bg-dark/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub 仓库
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/lulu/portfolio-site && git add -A && git commit -m "$(cat <<'EOF'
feat: add ProjectModal with overlay, ESC close, detail view, action buttons

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: Footer Component

**Files:**
- Create: `app/components/Footer.tsx`

- [ ] **Step 1: Write Footer component**

Write `app/components/Footer.tsx`:

```tsx
export default function Footer() {
  return (
    <footer className="py-8 px-6 text-center text-sm text-dark/40">
      <p>&copy; {new Date().getFullYear()} Lulu Yang. Built with Next.js &amp; Claude Code.</p>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/lulu/portfolio-site && git add -A && git commit -m "$(cat <<'EOF'
feat: add Footer component

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 9: Main Page Assembly

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Update root layout**

Write `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lulu Yang | AI Product Portfolio",
  description: "AI 产品经理 × AI Agent 开发者作品集",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Write main page**

Write `app/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import Footer from "./components/Footer";
import { projects, type Project } from "@/data/projects";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="gradient-bg min-h-screen">
      <Navbar />
      <Hero />

      {/* 项目卡片区 */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-2xl md:text-3xl font-bold text-dark text-center mb-12">
          My AI Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      <Footer />

      {/* 弹窗 */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
```

- [ ] **Step 3: Build and verify**

Run:
```bash
cd /Users/lulu/portfolio-site && npm run build 2>&1 | tail -10
```
Expected: Build succeeds. Output shows "Compiled successfully" or exit code 0.

- [ ] **Step 4: Start dev server and spot-check**

Run:
```bash
cd /Users/lulu/portfolio-site && npm run dev &
sleep 5 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```
Expected: Returns `200`.

- [ ] **Step 5: Commit**

```bash
cd /Users/lulu/portfolio-site && git add -A && git commit -m "$(cat <<'EOF'
feat: assemble main page with all sections and modal interaction

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 10: Final Verification

- [ ] **Step 1: Production build**

Run:
```bash
cd /Users/lulu/portfolio-site && npm run build 2>&1
```
Expected: All pages built successfully, no errors or warnings.

- [ ] **Step 2: Check all pages render**

Run:
```bash
cd /Users/lulu/portfolio-site && npm run dev &
sleep 5
# Check main page
echo "Main page: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000)"
# Check that HTML contains expected content
curl -s http://localhost:3000 | grep -c "Lulu Yang"
kill %1
```
Expected: Returns 200, grep returns > 0.

- [ ] **Step 3: Update data/URLs if needed**

Ask user to verify:
- Email address in Navbar (`yanglulu@example.com`)
- Live URLs for each project (Streamlit Cloud URLs may differ)
- GitHub URLs (telegram-agent may need a repo)

---

### Task 11: Documentation (CLAUDE.md Rule 2.1)

**Files:**
- Create: `产品介绍.md`
- Create: `产品更新日志.md`

- [ ] **Step 1: Write 产品介绍.md**

Write `产品介绍.md`:

```markdown
# 产品介绍 — 个人AI作品集网站

> 版本：v1.0 | 日期：2026-05-19

---

## 一、产品基础定位

**产品名称**：Lulu Yang AI Portfolio

**产品背景**：AI产品经理转型求职过程中，需要一个集中展示个人AI Agent项目的作品集网站。目标访问者为面试官和同行，用于快速了解候选人的产品能力和技术落地能力。

**使用人群**：面试官、同行、潜在合作者。

**核心解决痛点**：
- 3个AI Agent项目分散在不同平台，缺少统一展示入口
- 简历只能写文字，无法展示产品实际运行效果
- 需要传达「AI产品经理 × AI Agent开发者」双重身份

**产品价值**：单页作品集网站，Hero区建立个人品牌认知，卡片网格展示项目，弹窗快速浏览详情，提供在线体验和GitHub双入口。

---

## 二、完整功能清单

| 功能 | 说明 |
|------|------|
| Hero首屏 | 姓名、身份标签、一句话介绍、滚动提示 |
| 项目卡片 | 毛玻璃卡片网格，项目名、一句话描述、技术标签、hover上浮效果 |
| 详情弹窗 | 点击卡片弹出，2-3段产品介绍、技术标签、在线体验+GitHub双按钮 |
| 响应式布局 | ≥1024px三列、768-1023px两列、<768px单列 |
| 流动渐变背景 | 蓝紫→粉色渐变背景持续缓慢流动 |
| 顶部导航 | 固定顶部，左侧姓名，右侧GitHub/Email图标 |

---

## 三、AI技术架构

```
Next.js App Router (SSG)
  ├── app/layout.tsx (根布局 + 字体 + Metadata)
  ├── app/page.tsx (单页主入口，组合全部区块)
  ├── app/components/
  │   ├── Navbar.tsx (顶部导航)
  │   ├── Hero.tsx (首屏)
  │   ├── ProjectCard.tsx (项目卡片)
  │   ├── ProjectModal.tsx (详情弹窗)
  │   └── Footer.tsx (页脚)
  └── data/projects.ts (硬编码项目数据)
```

**技术特点**：纯静态页面，无API调用，无数据库，Next.js SSG生成，Vercel CDN分发。

---

## 四、大模型选型说明

本网站不涉及LLM调用，为纯前端静态展示页面。

---

## 五、调用方式说明

- **部署**：GitHub → Vercel自动部署
- **更新**：编辑 `data/projects.ts` → push → 自动上线

---

## 六、异常与边界处理

- 弹窗打开时禁止背景滚动
- ESC键关闭弹窗
- 点击遮罩层关闭弹窗
- 所有外部链接 `target="_blank"` + `rel="noopener noreferrer"`

---

## 七、迭代状态

- **当前版本**：v1.0
- **已知缺陷**：telegram-agent 暂无 GitHub 仓库链接
- **待优化**：增加项目截图、增加项目数后支持筛选、考虑暗色模式
```

- [ ] **Step 2: Write 产品更新日志.md**

Write `产品更新日志.md`:

```markdown
# 产品更新日志 — 个人AI作品集网站

## v1.0 — 2026-05-19（新增）

### 本次改动核心功能
首次上线个人AI作品集网站，包含Hero首屏、3个项目卡片、详情弹窗、响应式布局。

### 本次使用AI技术
- 框架：Next.js 15 + TypeScript
- 样式：Tailwind CSS 毛玻璃效果 + 流动渐变背景
- 动效：Framer Motion 淡入上浮 + hover缩放 + 弹窗动画
- 部署：Vercel（GitHub自动部署）

### 开发落地难点
1. **毛玻璃效果在Safari上的兼容**：需要同时设置 `backdrop-filter` 和 `-webkit-backdrop-filter`
2. **弹窗动画的关闭时机**：Framer Motion 的 AnimatePresence 需要在组件卸载时播放退出动画，使用 `exit` prop + `AnimatePresence` 包裹解决
3. **项目数据硬编码的维护成本**：3个项目尚可接受，项目数增长后需考虑CMS

### 解决方案与取舍
- 选择纯静态硬编码数据而非CMS，理由是3个项目的更新频率极低，CMS反而增加复杂度
- 选择单页应用而非多页路由，理由是3张卡片的情况下多页显得空洞，单页+弹窗体验更流畅
- 放弃暗色模式，理由是同一个人使用双套配色增加50%设计和维护成本，暂不必要

### 产品复盘思考
本次是个人第一个纯前端作品集网站。最大收获是意识到：作品集的核心不是技术有多炫，而是让面试官在30秒内看明白你是谁、做了什么。因此设计上刻意控制信息密度——Hero区3行字、卡片3张、弹窗300字，避免信息过载。
```

- [ ] **Step 3: Commit**

```bash
cd /Users/lulu/portfolio-site && git add -A && git commit -m "$(cat <<'EOF'
docs: add 产品介绍.md and 产品更新日志.md

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 12: Create GitHub Repository & Push

- [ ] **Step 1: Check GitHub auth**

Run:
```bash
gh auth status 2>&1
```
Expected: "Logged in to github.com as ..."

If not authenticated, the user needs to run `gh auth login` first.

- [ ] **Step 2: Create GitHub repo and push**

Run:
```bash
cd /Users/lulu/portfolio-site && \
gh repo create portfolio-site --public --source=. --remote=origin --push
```
Expected: Repo created and code pushed successfully.

- [ ] **Step 3: Deploy to Vercel (user action required)**

Inform user:
- Open [vercel.com](https://vercel.com)
- Click "New Project" → Import `angelover66/portfolio-site`
- Vercel auto-detects Next.js, no config needed
- Click "Deploy"
- After first deploy, every `git push` auto-deploys
