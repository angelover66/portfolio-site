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
    liveUrl: "https://english-agent-gp3jehtasegglfowv8grsy.streamlit.app",
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
    liveUrl: "https://interview-agent-tpsouzxk2tksahgbx5eus5.streamlit.app/#96e9abf8",
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
