# 中英双语重设计 — 设计文档

> 2026-05-27 | portfolio-site v1.2

## 一、目标

将个人作品集网站的 Hero 区和项目卡片区改为中英文双语展示，同时对视觉进行局部重设计。

## 二、双语规则

| 内容 | 规则 |
|------|------|
| Hero 身份标签 | 中文大 + 英文小灰色 |
| Hero 介绍 | 中文在上，英文在下（灰色小字） |
| 项目名 | 中文名（主） + 英文名（副，小灰色） |
| 项目 tagline | 中文大 + 英文小灰色 |
| 项目描述（弹窗） | 保持纯中文 |
| 技术标签 | 保持原样 |
| 按钮文字 | 中英文（在线体验 / Live Demo） |

## 三、数据结构变更

Project 接口新增可选字段：

```typescript
interface Project {
  // ... 现有字段保持不变
  nameEn?: string;      // 英文项目名
  taglineEn?: string;   // 英文 tagline
}
```

## 四、组件改动

### 4.1 Hero 区 — 重做

- 布局：居中，照片更大（w-48 md:w-64），放在最上方
- 下方依次：身份标签 → 姓名 → 中文介绍 → 英文介绍
- 身份标签改为双语：`AI 产品经理 × AI Agent 开发者` / `AI PM × AI Agent Developer`
- 英文介绍灰色小字，紧跟中文介绍下方
- 照片保持正方形、圆角

### 4.2 项目卡片 — 横向布局

- 从 4 列 grid 改为单列竖向排列
- 每张卡片 flex 横向：左侧 emoji（大号），右侧项目信息
- 项目名：中文（主）+ 英文名（副，小灰色）
- tagline：中文 + 英文（小灰色）
- 技术标签
- "查看详情 →"

### 4.3 卡片英文数据

| 项目 | 英文名 | 英文 tagline |
|------|--------|-------------|
| 面试助手 | Interview Copilot | AI-Powered Interview Preparation |
| Daily Mic | Lulu's Daily Mic | Daily English Speaking Coach |
| OfferWin | OfferWin | Job Hunt Progress Tracker |
| 琵琶生成器 | Pipa Score Generator | AI-Powered Pipa Sheet Music |

### 4.4 弹窗

- 标题区：中文名（主）+ 英文名（副）
- 描述保持纯中文
- 其他不变

## 五、CSS 优化

- 背景渐变：饱和度降低 20%，动画速度降至 18s
- 卡片圆角：统一 `rounded-2xl`
- 卡片 hover：阴影更柔和（透明度 0.05）
- 字体层级：标题字号加大一档
- 间距：Hero 与项目区间距收紧

## 六、不改动的部分

- Navbar、Footer 不变
- 项目弹窗交互逻辑不变
- 二维码展示逻辑不变
- 技术栈不变

## 七、实施顺序

1. 更新 data/projects.ts — 新增 nameEn、taglineEn 字段
2. 重写 Hero.tsx — 双语 + 大照片
3. 重写 ProjectCard.tsx — 横向布局 + 双语
4. 更新 ProjectModal.tsx — 标题双语
5. 优化 globals.css — 色彩/间距/动效
6. 更新 page.tsx — 网格改单列
7. 本地验证 + 部署
