"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, Send, Command, Cpu } from "lucide-react";

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleFocus = () => {
      setIsActive(true);
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
      setTimeout(() => setIsActive(false), 2000); // Remove active highlight after a bit
    };

    window.addEventListener('focus-ai-terminal', handleFocus);
    return () => window.removeEventListener('focus-ai-terminal', handleFocus);
  }, []);

  return (
    <section id="ai-assistant" className="py-24 relative border-t border-white/5 bg-[#09090b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 flex flex-col lg:flex-row gap-12 lg:items-center">
        
        <div className="lg:w-1/3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 flex items-center gap-3">
            <Cpu size={28} className="text-gray-400" /> AI Context Engine
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">
            Query my experience, tech stack, or engineering philosophy directly. Powered by a custom RAG pipeline connected to my personal knowledge graph.
          </p>
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Suggested Queries</p>
            {['query --project "Visi Core AI"', 'query --role "IDEAS-TIH"', 'query --skills "Backend & AI"'].map((cmd) => (
              <button 
                key={cmd}
                onClick={() => {
                  setInput(cmd);
                  if (inputRef.current) inputRef.current.focus({ preventScroll: true });
                }}
                className="block w-full text-left px-4 py-3 bg-[#111113] border border-white/5 hover:border-white/20 transition-colors text-sm text-gray-300 font-mono"
              >
                &gt; {cmd}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:w-2/3">
          <motion.div 
            animate={isActive ? { scale: [1, 1.02, 1], borderColor: ["rgba(255,255,255,0.1)", "rgba(16,185,129,0.5)", "rgba(255,255,255,0.1)"] } : {}}
            transition={{ duration: 0.8 }}
            className={`backdrop-blur-md bg-black/30 border ${isActive ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1),inset_0_1px_0_0_rgba(255,255,255,0.05)]' : 'border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.02)]'} rounded-sm overflow-hidden flex flex-col h-[400px] transition-all duration-500`}
          >
            {/* Terminal Header */}
            <div className="h-10 bg-white/[0.02] border-b border-white/5 flex items-center px-4 justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={14} className={isActive ? "text-emerald-500" : "text-gray-500"} />
                <span className="text-xs font-mono text-gray-500">context_engine_v2.0.sh</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 font-mono text-sm">
              <div className="flex gap-3 text-gray-400">
                <span className="text-emerald-500 shrink-0">system~</span>
                <p>Knowledge graph loaded. 1,204 semantic nodes available.</p>
              </div>
              <div className="flex gap-3 text-gray-400">
                <span className="text-emerald-500 shrink-0">system~</span>
                <p>Awaiting prompt...</p>
              </div>
            </div>

            {/* Terminal Input */}
            <div className="p-4 bg-black/40 backdrop-blur-md border-t border-white/5">
              <div className="relative flex items-center">
                <Command size={14} className="absolute left-3 text-gray-500" />
                <input 
                  id="ai-terminal-input"
                  ref={inputRef}
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter query..."
                  className="w-full bg-transparent border border-white/10 rounded-sm py-3 pl-9 pr-12 text-sm text-white focus:outline-none focus:border-emerald-500/50 font-mono transition-colors"
                />
                <button className="absolute right-3 text-gray-500 hover:text-white transition-colors">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
