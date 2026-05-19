"use client";

import { motion } from "framer-motion";
import { Cpu, Server, Layout, Network } from "lucide-react";

const skillLayers = [
  {
    title: "AI / ML CORE",
    description: "Intelligent systems integration, retrieval-augmented generation, and multimodal language models.",
    icon: <Cpu size={16} className="text-gray-400" />,
    skills: ["RAG Architecture", "Gemini API", "Multimodal LLMs", "Neo4j"]
  },
  {
    title: "BACKEND / INFRA",
    description: "High-performance APIs, robust database design, and scalable backend services.",
    icon: <Server size={16} className="text-gray-400" />,
    skills: ["Java", "Spring Boot", "PostgreSQL", "Node.js"]
  },
  {
    title: "SYSTEM DESIGN",
    description: "Architecting distributed systems, containerization, and modern deployment pipelines.",
    icon: <Network size={16} className="text-gray-400" />,
    skills: ["REST APIs", "Docker", "CI/CD", "Graph DBs"]
  },
  {
    title: "FRONTEND / INTERACTION",
    description: "Building responsive, component-driven user interfaces with modern web technologies.",
    icon: <Layout size={16} className="text-gray-400" />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  }
];

export default function Skills() {
  return (
    <section id="stack" className="py-24 relative bg-[#09090b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Skills Galaxy & Architecture
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl leading-relaxed">
            A systematic breakdown of technical capabilities across domains. Organized by functional layers rather than simple lists, reflecting actual architectural relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Abstract Architecture Diagram Area */}
          <div className="lg:col-span-7 bg-[#111113] border border-white/5 p-8 flex items-center justify-center min-h-[400px]">
            <div className="relative w-full max-w-md aspect-video border border-white/10 flex items-center justify-center">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
               <div className="z-10 px-6 py-3 bg-[#09090b] border border-white/20 text-xs font-mono tracking-widest text-gray-300 uppercase shadow-2xl">
                 System Diagram Placeholder
               </div>
            </div>
          </div>

          {/* Functional Layers */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-4">
            {skillLayers.map((layer, idx) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  {layer.icon}
                  <h3 className="text-xs font-semibold tracking-widest text-white uppercase">
                    {layer.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  {layer.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {layer.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2 py-1 text-[10px] font-semibold tracking-widest uppercase text-gray-400 bg-black/50 border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
