"use client";

import { motion } from "framer-motion";
import { Download, FileText, CheckCircle2, Eye } from "lucide-react";

export default function ResumeHub() {
  return (
    <section id="resume" className="py-24 relative border-t border-white/5 bg-[#09090b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Resume Hub
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl leading-relaxed">
            Direct access to comprehensive technical documentation, skills summary, and formal experience records.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Recruiter Quick Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="p-8 bg-[#111113] border border-white/5 shadow-2xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                Recruiter TL;DR
              </h3>
              <ul className="space-y-4">
                {[
                  "Full-Stack & AI Systems Engineer with proven production experience.",
                  "Architected scalable backend microservices and data pipelines at IDEAS-TIH (ISI Kolkata).",
                  "Built high-performance, responsive React/Next.js frontends at Gameonix.",
                  "Global Rank 2637 in TCS CodeVita, demonstrating strong algorithmic problem-solving."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed">
                    <CheckCircle2 size={16} className="text-gray-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-[#111113] border border-white/5 shadow-2xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                Core Competencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Java", "Spring Boot", "React", "Next.js", "TypeScript", "PostgreSQL", "Neo4j", "Docker", "RAG & LLM Integration", "System Architecture"].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-white/[0.02] border border-white/10 text-xs font-semibold tracking-widest text-gray-300 uppercase">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Document Preview & Download */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#111113] border border-white/10 p-8 flex flex-col justify-center items-center relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <div className="relative z-10 w-full max-w-sm aspect-[1/1.4] bg-[#0c0c0e] border border-white/10 shadow-2xl flex flex-col items-center justify-center p-6 group-hover:border-white/20 transition-all">
              <FileText size={48} className="text-gray-600 mb-6 group-hover:text-gray-400 transition-colors" />
              <div className="text-center">
                <p className="text-sm font-bold text-white mb-1 uppercase tracking-widest">Abhirup_Bhowmick_CV.pdf</p>
                <p className="text-xs text-gray-500 font-mono">1.2 MB // PDF DOCUMENT</p>
              </div>
              
              <div className="mt-8 flex w-full gap-3">
                <a 
                  href="/resume/abhirup_bhowmick_cv.pdf" 
                  download="Abhirup_Bhowmick_CV.pdf"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-black font-semibold text-xs tracking-widest uppercase hover:bg-gray-200 hover:scale-[1.02] transition-all"
                >
                  <Download size={14} /> Download
                </a>
                <a 
                  href="/resume/abhirup_bhowmick_cv.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-transparent border border-white/20 text-white font-semibold text-xs tracking-widest uppercase hover:bg-white/5 hover:scale-[1.02] transition-all"
                >
                  <Eye size={14} /> Preview
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
