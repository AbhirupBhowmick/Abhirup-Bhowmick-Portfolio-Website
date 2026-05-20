"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";

const projects = [
  {
    title: "Visi Core AI",
    description: "Real-Time Multimodal Vision Intelligence Platform. Built deterministic prompt pipelines for reliable AI outputs and implemented real-time SSE streaming architecture.",
    stack: ["NEXT.JS", "REACT", "VERCEL AI SDK"],
    link: "https://visi-core-ai.vercel.app/",
    github: "https://github.com/AbhirupBhowmick/VisiCore-AI",
  },
  {
    title: "ResuMatch AI",
    description: "AI-Powered Resume Intelligence SaaS Platform. Implemented secure REST APIs, Razorpay webhook integrations, and an AI-driven resume-to-job-description matching system.",
    stack: ["SPRING BOOT", "POSTGRESQL", "REST API"],
    link: "https://resu-match-ai-eight.vercel.app/",
    github: "https://github.com/AbhirupBhowmick/ResuMatch-AI",
  },
  {
    title: "Second Brain AI",
    description: "Distributed Knowledge Graph & Retrieval System. Implemented graph-based semantic knowledge traversal and designed context-aware AI assistant workflows.",
    stack: ["REACT", "NEO4J", "DOCKER", "RAG"],
    link: "https://second-brain-ai-psi.vercel.app/",
    github: "https://github.com/AbhirupBhowmick/Second-Brain-AI",
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative border-t border-white/5 bg-[#09090b]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Projects Universe
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl leading-relaxed">
            Architecting scalable solutions at the intersection of complex data systems and elegant user interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 sm:p-8 bg-[#111113] border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between min-h-[280px] group ${idx === 0 ? 'lg:col-span-2' : ''}`}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-gray-200 transition-colors">
                    {project.title}
                  </h3>
                  <div className="project-actions">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-icon"
                      aria-label={`${project.title} GitHub Repository`}
                    >
                      <GitBranch size={16} />
                    </a>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-icon"
                      aria-label={`${project.title} Live Demo`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.stack.map(tech => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 text-[10px] font-semibold tracking-widest uppercase text-gray-400 bg-black/50 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
