"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";
import { 
  Download, 
  FileText, 
  CheckCircle2, 
  Eye, 
  X, 
  Cpu, 
  ShieldAlert, 
  Activity, 
  TrendingUp, 
  Layers 
} from "lucide-react";

interface ResumeMetadata {
  filename: string;
  size: string;
  modified: string;
  version: string;
  url: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Resume asset unavailable.");
  }
  return res.json();
};

export default function ResumeHub() {
  const { data: metadata, error, isLoading } = useSWR<ResumeMetadata>("/api/resume/metadata", fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false
  });

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);

  // Background scroll lock when resume viewer is active
  useEffect(() => {
    if (isViewerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isViewerOpen]);

  // Command executor trigger to AI Context Engine
  const triggerAIQuery = (query: string) => {
    // Scroll to AI terminal smoothly
    const aiSection = document.getElementById("ai-assistant");
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: "smooth" });
    }
    
    // Dispatch query execution event
    setTimeout(() => {
      const event = new CustomEvent("execute-ai-query", { detail: { query } });
      window.dispatchEvent(event);
    }, 400);
  };

  // Mock analytics logging & download initiator
  const handleDownload = () => {
    if (!metadata) return;
    
    setDownloadStatus("transmitting");
    
    // Custom event telemetry for Vercel/analytics tracking
    console.log(`[TELEMETRY] Resume download triggered: ${metadata.filename} at ${new Date().toISOString()}`);
    
    setTimeout(() => {
      setDownloadStatus("success");
      
      // Auto-reset status message after 3 seconds
      setTimeout(() => setDownloadStatus(null), 3000);
    }, 1200);
  };

  // Recruiter intelligence card items
  const recruiterTLDR = [
    {
      title: "Full-Stack & AI Systems",
      desc: "Specializing in distributed backend services and intelligent RAG architectures.",
      query: 'query --focus "AI Systems"',
      icon: <Cpu size={16} className="text-gray-400" />
    },
    {
      title: "Distributed Graphs",
      desc: "Engineered scalable Cypher models and microservices at IDEAS-TIH (ISI Kolkata).",
      query: 'query --role "IDEAS-TIH"',
      icon: <Layers size={16} className="text-gray-400" />
    },
    {
      title: "Interactive Frontends",
      desc: "Delivered responsive Next.js viewport configurations and GSAP timelines at Gameonix.",
      query: 'query --role "GAMEONIX"',
      icon: <Activity size={16} className="text-gray-400" />
    },
    {
      title: "Algorithmic Capability",
      desc: "Achieved Global Rank 2637 in TCS CodeVita, demonstrating strong mathematical logic.",
      query: 'query --skill "System Design"',
      icon: <TrendingUp size={16} className="text-gray-400" />
    }
  ];

  // Competency skills badges
  const competencies = [
    { name: "Java", query: 'query --skill "Java"' },
    { name: "Spring Boot", query: 'query --skill "Spring Boot"' },
    { name: "React", query: 'query --skill "React"' },
    { name: "Next.js", query: 'query --skill "Next.js"' },
    { name: "TypeScript", query: 'query --skill "TypeScript"' },
    { name: "PostgreSQL", query: 'query --skill "PostgreSQL"' },
    { name: "Neo4j", query: 'query --skill "Neo4j"' },
    { name: "Docker", query: 'query --skill "Docker"' },
    { name: "RAG & LLM Integration", query: 'query --skill "RAG"' },
    { name: "System Architecture", query: 'query --skill "System Design"' }
  ];

  // Animation presets
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="resume" className="py-24 relative border-t border-white/5 bg-[#09090b]">
      {/* Background ambient lighting */}
      <div className="absolute top-[10%] right-[20%] w-[500px] h-[250px] bg-indigo-500/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Resume Hub
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl leading-relaxed">
            Direct access to comprehensive technical documentation, skills summary, and formal experience records.
          </p>
        </div>

        {error ? (
          <div className="p-8 bg-[#111113] border border-red-500/10 rounded-sm flex flex-col items-center justify-center text-center gap-2">
            <ShieldAlert size={28} className="text-red-400 mb-2" />
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Asset Sync Error</h4>
            <p className="text-xs text-gray-500 font-mono">system~ Resume asset unavailable.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column: Interactive intelligence cards & competencies */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col gap-6"
            >
              
              {/* Recruiter Intel Cards */}
              <div className="p-8 bg-[#111113] border border-white/5 shadow-2xl rounded-sm">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                  Recruiter TL;DR
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recruiterTLDR.map((card, idx) => (
                    <div 
                      key={idx}
                      onClick={() => triggerAIQuery(card.query)}
                      className="p-4 bg-black/20 border border-white/5 hover:border-white/20 hover:scale-[1.01] transition-all duration-300 cursor-pointer rounded-sm flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {card.icon}
                          <h4 className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">
                            {card.title}
                          </h4>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                      <span className="text-[9px] font-mono text-gray-600 group-hover:text-emerald-500 transition-colors mt-4 self-end">
                        QUERY CONSOLE &rarr;
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Competencies badges */}
              <div className="p-8 bg-[#111113] border border-white/5 shadow-2xl rounded-sm">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                  Live Competency Nodes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {competencies.map((skill) => (
                    <button 
                      key={skill.name}
                      onClick={() => triggerAIQuery(skill.query)}
                      className="px-3 py-1.5 bg-[#09090b] border border-white/5 hover:border-emerald-500/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.05)] text-[10px] font-mono font-semibold tracking-widest text-gray-400 hover:text-white uppercase transition-all duration-300 cursor-pointer rounded-sm"
                    >
                      {skill.name}
                    </button>
                  ))}
                </div>
              </div>

            </motion.div>

            {/* Right Column: PDF Card */}
            <div className="bg-[#111113] border border-white/5 p-8 flex flex-col justify-center items-center relative overflow-hidden shadow-2xl rounded-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              
              {isLoading || !metadata ? (
                <div className="w-full max-w-sm aspect-[1/1.4] bg-[#0c0c0e] border border-white/5 flex flex-col items-center justify-center p-6 animate-pulse rounded-sm">
                  <div className="w-12 h-12 bg-white/5 rounded-md mb-6" />
                  <div className="h-4 w-1/2 bg-white/5 rounded-md mb-2" />
                  <div className="h-3 w-1/3 bg-white/5 rounded-md" />
                </div>
              ) : (
                <div className="relative z-10 w-full max-w-sm aspect-[1/1.4] bg-[#0c0c0e] border border-white/5 hover:border-white/10 shadow-2xl flex flex-col items-center justify-center p-6 transition-all duration-300 rounded-sm group">
                  <FileText size={48} className="text-gray-600 mb-6 group-hover:text-gray-400 transition-colors duration-300" />
                  
                  <div className="text-center space-y-1.5">
                    <p className="text-xs font-bold text-white uppercase tracking-widest">
                      {metadata.filename}
                    </p>
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                      {metadata.size} // {metadata.modified} // {metadata.version}
                    </p>
                  </div>
                  
                  <div className="mt-8 flex flex-col w-full gap-3">
                    <div className="flex w-full gap-3">
                      <a 
                        href={metadata.url} 
                        download={metadata.filename}
                        onClick={handleDownload}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-white hover:bg-gray-100 text-black font-semibold text-[10px] tracking-widest uppercase transition-all duration-300 rounded-sm cursor-pointer"
                      >
                        <Download size={12} /> Download
                      </a>
                      <button 
                        onClick={() => {
                          setIframeLoading(true);
                          setIsViewerOpen(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-transparent border border-white/10 hover:border-white/20 text-white font-semibold text-[10px] tracking-widest uppercase hover:bg-white/[0.02] transition-all duration-300 rounded-sm cursor-pointer"
                      >
                        <Eye size={12} /> Preview
                      </button>
                    </div>

                    {/* Telemetry Output Box */}
                    {downloadStatus && (
                      <div className="mt-2 text-center">
                        <span className="text-[9px] font-mono text-emerald-500 transition-all">
                          {downloadStatus === "transmitting" ? "system~ Resume payload transmitting..." : "system~ Resume payload successfully transmitted."}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      {/* PDF View Modal Overlay */}
      <AnimatePresence>
        {isViewerOpen && metadata && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8"
          >
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl h-[85vh] bg-[#0c0c0e] border border-white/10 rounded-sm shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Title bar */}
              <div className="h-14 bg-white/[0.02] border-b border-white/5 flex items-center justify-between px-6 shrink-0 select-none">
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-gray-400" />
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest leading-none">
                      {metadata.filename}
                    </h3>
                    <span className="text-[9px] font-mono text-gray-500">
                      SECURE DOCUMENT VIEW // {metadata.size}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsViewerOpen(false)}
                  className="p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all rounded-sm cursor-pointer"
                  aria-label="Close document viewer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* PDF Container frame */}
              <div className="flex-1 bg-[#121214] relative">
                {iframeLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0c0c0e] z-10 animate-pulse">
                    <FileText size={32} className="text-gray-600 animate-bounce" />
                    <p className="text-xs font-mono text-gray-500">system~ Mounting secure PDF stream...</p>
                  </div>
                )}
                <iframe 
                  src={`${metadata.url}#toolbar=0&navpanes=0`}
                  className="w-full h-full border-0"
                  onLoad={() => setIframeLoading(false)}
                  title="Abhirup Bhowmick Resume PDF"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
