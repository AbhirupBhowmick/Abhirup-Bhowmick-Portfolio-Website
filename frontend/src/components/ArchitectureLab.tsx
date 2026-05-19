"use client";

import { motion } from "framer-motion";

const architectures = [
  {
    id: "visi-core",
    title: "Visi Core AI Pipeline",
    subtitle: "CASE STUDY_01 // HIGH-THROUGHPUT STREAMING",
    flows: {
      request: "Next.js Client & WebSockets",
      backend: "SSE Streaming Gateway",
      ai: "Vercel AI SDK & Multimodal LLM",
      database: "State Management"
    }
  },
  {
    id: "resumatch",
    title: "ResuMatch AI Engine",
    subtitle: "CASE STUDY_02 // SECURE B2B SAAS",
    flows: {
      request: "React SPA & Webhook Listeners",
      backend: "Spring Boot REST APIs",
      ai: "AI Resume Matching Engine",
      database: "PostgreSQL Database"
    }
  },
  {
    id: "second-brain",
    title: "Second Brain RAG System",
    subtitle: "CASE STUDY_03 // DISTRIBUTED KNOWLEDGE",
    flows: {
      request: "Context-Aware User Query",
      backend: "Dockerized API Microservices",
      ai: "LangChain Orchestration",
      database: "Neo4j Knowledge Graph & Vector Store"
    }
  }
];

export default function ArchitectureLab() {
  return (
    <section id="lab" className="py-24 relative border-t border-white/5 bg-[#09090b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="mb-20 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Architecture Lab
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            High-fidelity blueprints of complex systems deployed in production. Detailing the exact request, backend, AI, and database flows.
          </p>
        </div>

        <div className="space-y-12">
          {architectures.map((arch, index) => (
            <motion.div 
              key={arch.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-white/10 bg-[#111113] overflow-hidden"
            >
              {/* Header */}
              <div className="border-b border-white/10 px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#151518]">
                <div>
                  <h3 className="text-lg font-bold text-white">{arch.title}</h3>
                  <p className="text-xs font-mono tracking-widest text-gray-500 uppercase mt-1">{arch.subtitle}</p>
                </div>
                <div className="flex gap-4 text-xs font-mono tracking-widest text-gray-400 uppercase">
                  <span>SCALE: AUTO</span>
                  <span>STATUS: ACTIVE</span>
                </div>
              </div>

              {/* Architecture Blueprint Area */}
              <div className="p-8 lg:p-12 bg-[#09090b] relative overflow-hidden flex items-center justify-center min-h-[400px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                
                <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
                  {/* Flow Blocks */}
                  {[
                    { label: "Request Flow", value: arch.flows.request },
                    { label: "Backend Flow", value: arch.flows.backend },
                    { label: "AI Flow", value: arch.flows.ai },
                    { label: "Storage Flow", value: arch.flows.database }
                  ].map((flow, i) => (
                    <div key={flow.label} className="relative flex flex-col">
                      <div className="p-6 bg-[#111113] border border-white/10 h-full shadow-2xl flex flex-col justify-center min-h-[120px] md:min-h-[160px] z-10">
                        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-3 border-b border-white/5 pb-2">
                          {flow.label}
                        </span>
                        <span className="text-sm font-semibold text-gray-200 leading-snug">
                          {flow.value}
                        </span>
                      </div>
                      
                      {/* Connection Lines (Desktop) */}
                      {i < 3 && (
                        <div className="hidden md:flex absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 w-8 h-[1px] bg-gray-600 z-0">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-gray-500 rotate-45"></div>
                        </div>
                      )}
                      
                      {/* Connection Lines (Mobile) */}
                      {i < 3 && (
                        <div className="md:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 w-[1px] h-6 bg-gray-600 z-0">
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-b border-r border-gray-500 rotate-45"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
