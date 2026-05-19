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
        <p className="text-lg md:text-xl leading-relaxed max-w-lg mx-auto" style={{ color: "rgba(26,26,46,0.6)" }}>
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
        <div className="w-5 h-8 rounded-full flex items-start justify-center p-1" style={{ border: "2px solid rgba(26,26,46,0.2)" }}>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 rounded-full"
            style={{ backgroundColor: "rgba(26,26,46,0.3)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
