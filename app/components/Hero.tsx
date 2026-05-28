"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-28 pb-16 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl"
      >
        {/* 照片 + 文字区 */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
          {/* 个人照片 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="shrink-0"
          >
            <img
              src="/avatar.jpg"
              alt="Lulu Yang"
              className="w-40 h-40 md:w-56 md:h-56 rounded-2xl object-cover shadow-lg"
              style={{ border: "3px solid rgba(99,102,241,0.15)" }}
            />
          </motion.div>

          {/* 文字 */}
          <div className="text-center md:text-left flex-1">
            {/* 身份标签 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full text-sm font-medium"
              style={{
                background: "linear-gradient(90deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))",
                color: "#6366f1",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              AI 产品经理 &times; AI Agent 开发者
            </motion.div>

            {/* 姓名 */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4" style={{ color: "#1a1a2e" }}>
              Lulu Yang
            </h1>

            {/* 一句话介绍 */}
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: "rgba(26,26,46,0.6)" }}>
              一名拥有5年经验的互联网大厂B端AI 产品经理，专注用 AI 技术赋能企业业务。AI深度玩家，Claude Code资深用户，擅长通过Vibecoding快速实现产品创意，持续探索 AI 产品的更多落地形态。
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
