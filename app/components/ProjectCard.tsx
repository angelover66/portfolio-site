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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="glass-card p-6 md:p-8 cursor-pointer flex items-center gap-5 md:gap-8"
      style={{ transition: "box-shadow 0.3s" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 16px 32px rgba(99,102,241,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Emoji */}
      <div className="shrink-0 text-4xl md:text-5xl select-none">
        {project.emoji}
      </div>

      {/* 内容 */}
      <div className="flex-1 min-w-0">
        {/* 项目名 */}
        <h3 className="text-lg md:text-xl font-semibold mb-0.5" style={{ color: "#1a1a2e" }}>
          {project.name}
        </h3>

        {/* 一句话描述 */}
        <p className="text-sm mb-3 leading-relaxed" style={{ color: "rgba(26,26,46,0.5)" }}>
          {project.tagline}
        </p>

        {/* 技术标签 */}
        <div className="flex flex-wrap gap-2">
          {project.techTags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: "rgba(99,102,241,0.08)", color: "#6366f1" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 查看详情 */}
      <span
        className="shrink-0 inline-flex items-center gap-1 text-sm font-medium"
        style={{ color: "#6366f1" }}
      >
        <span className="hidden md:inline">查看详情</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </motion.div>
  );
}
