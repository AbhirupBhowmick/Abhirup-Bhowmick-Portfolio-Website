"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Download, Terminal } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Graphic (Concentric Circles) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-20 z-0">
        <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="400" r="399" stroke="white" strokeWidth="1" strokeDasharray="4 8"/>
          <circle cx="400" cy="400" r="300" stroke="white" strokeWidth="1" strokeDasharray="4 8"/>
          <circle cx="400" cy="400" r="200" stroke="white" strokeWidth="1"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-8 lg:px-12 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-[1px] bg-gray-500"></div>
            <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Full-Stack & AI Systems Engineer
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-bold tracking-tight mb-8 text-white leading-[1.1]">
            Engineering intelligent systems with architectural precision.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
            Results-driven Software Engineer with strong expertise in full-stack development, scalable backend systems, and modern AI integrations including RAG and multimodal LLMs. Passionate about clean architecture, intelligent systems, and production-grade engineering experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <MagneticButton>
              <Button 
                size="lg" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-none bg-white text-black hover:bg-gray-200 hover:scale-[1.02] transition-all gap-3 w-full sm:w-auto font-semibold text-xs tracking-widest uppercase px-8 h-12"
              >
                View Projects <ArrowRight size={16} />
              </Button>
            </MagneticButton>
            
            <MagneticButton>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#ai-assistant')?.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => window.dispatchEvent(new CustomEvent('focus-ai-terminal')), 600);
                }}
                className="rounded-none gap-3 w-full sm:w-auto bg-transparent border-white/10 text-gray-300 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all font-semibold text-xs tracking-widest uppercase px-8 h-12"
              >
                <Terminal size={16} /> Talk to AI
              </Button>
            </MagneticButton>
            
            <MagneticButton>
              <Button 
                size="lg" 
                variant="ghost" 
                onClick={() => window.open('/resume/abhirup_bhowmick_cv.pdf', '_blank')}
                className="rounded-none gap-3 w-full sm:w-auto text-gray-400 hover:text-white hover:bg-white/5 hover:scale-[1.02] transition-all font-semibold text-xs tracking-widest uppercase px-6 h-12"
              >
                <Download size={16} /> Resume
              </Button>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
