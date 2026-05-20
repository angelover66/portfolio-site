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
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" style={{ color: "#1a1a2e" }}>
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
