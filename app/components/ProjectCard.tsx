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
      className="glass-card p-6 md:p-8 cursor-pointer"
      style={{ transition: "box-shadow 0.3s" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(99,102,241,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Emoji + 项目名 */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{project.emoji}</span>
        <h3 className="text-xl font-semibold" style={{ color: "#1a1a2e" }}>
          {project.name}
        </h3>
      </div>

      {/* 一句话描述 */}
      <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(26,26,46,0.5)" }}>
        {project.tagline}
      </p>

      {/* 技术标签 */}
      <div className="flex flex-wrap gap-2 mb-4">
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

      {/* 查看详情 */}
      <span
        className="inline-flex items-center gap-1 text-sm font-medium"
        style={{ color: "#6366f1", transition: "gap 0.2s" }}
      >
        查看详情
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </motion.div>
  );
}
