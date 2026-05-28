export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string[];
  techTags: string[];
  liveUrl: string;
  githubUrl: string;
  emoji: string;
  qrcode?: string;
}

export const projects: Project[] = [
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
    liveUrl: "https://interview-agent-tpsouzxk2tksahgbx5eus5.streamlit.app/#96e9abf8",
    githubUrl: "https://github.com/angelover66/interview-agent",
  },
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
    liveUrl: "https://english-agent-gp3jehtasegglfowv8grsy.streamlit.app",
    githubUrl: "https://github.com/angelover66/english-agent",
  },
  {
    id: "offerwin",
    name: "OfferWin",
    tagline: "求职面试进度追踪微信小程序",
    emoji: "🏆",
    description: [
      "面向正在准备求职面试的用户，解决「求职过程缺乏系统化打卡记录和进度追踪工具」这一痛点。以微信小程序为载体，零安装门槛，帮助用户记录每日学习/面试进度，追踪面试全流程。",
      "核心功能：每日打卡（记录学习活动、时长、备注、照片），面试流程管理（追踪每轮状态：待面试/已通过/未通过/Offer，获 Offer 后自动冻结防误改），好友组队打卡（邀请微信好友互相监督，共享打卡摘要），个人统计面板（打卡次数、累计时长、面试数、Offer 数）。",
      "技术实现：微信小程序原生框架（WXML/WXSS/JS），微信云开发 CloudBase（云函数 + 云数据库），手机号一键登录。纯工具型产品，不依赖 LLM。",
    ],
    techTags: ["微信小程序", "CloudBase", "云函数", "WXML"],
    liveUrl: "",
    githubUrl: "",
    qrcode: "/offerwin-qrcode.jpg",
  },
  {
    id: "pipa-score",
    name: "琵琶简谱自动生成器",
    tagline: "AI 驱动的琵琶谱生成与演奏工具",
    emoji: "🎵",
    description: [
      "面向琵琶学习者和民乐爱好者，解决「想弹的流行曲没有适配琵琶谱」这一核心痛点。上传任意音乐或视频，自动生成三种难度（低/中/高）的琵琶简谱，并支持琵琶音色模拟播放。",
      "核心能力：ffmpeg.wasm 浏览器端音频提取，Spotify Basic Pitch 旋律转写，六维度规则引擎编曲（音符密度/节奏/技法/把位/调性/速度），SVG+Canvas 古风谱面渲染，FluidR3 SoundFont 琵琶音色合成。全链路浏览器端离线运行，零后端依赖，零 LLM 调用。",
      "额外提供曲谱库（LocalStorage 持久化）、PNG/JSON/打印三种导出方式、20首预置素材曲目、播放调速等配套功能。",
    ],
    techTags: ["Next.js", "TypeScript", "Basic Pitch", "ffmpeg.wasm", "Web Audio API", "Tailwind CSS"],
    liveUrl: "https://pipa-score-generator.vercel.app/",
    githubUrl: "https://github.com/angelover66/pipa-score-generator",
  },
];
