import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProjectDeepDive = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const paths = svgRef.current.querySelectorAll('.flow-line');
    
    paths.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(path, {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      });
    });

    const nodes = document.querySelectorAll('.arch-node');
    gsap.fromTo(nodes, 
      { opacity: 0, scale: 0.8, y: 30 },
      { 
        opacity: 1, scale: 1, y: 0, 
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      }
    );

  }, []);

  return (
    <div className="min-h-[150vh] bg-gray-950 text-white font-sans py-24 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-[#00ffcc] mb-4">
            Architecture Lab
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A deep dive into the system topology. Scroll to trace the data flow through the high-availability pipeline.
          </p>
        </div>

        <div className="relative w-full aspect-video rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl p-10 shadow-2xl flex items-center justify-center">
          
          <svg 
            ref={svgRef}
            className="absolute inset-0 w-full h-full z-0 pointer-events-none" 
            viewBox="0 0 1000 500" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Flow lines */}
            <path className="flow-line" d="M 200 250 L 400 150 L 600 250" stroke="url(#neonGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path className="flow-line" d="M 200 250 L 400 350 L 600 250" stroke="url(#neonGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path className="flow-line" d="M 600 250 L 800 250" stroke="url(#neonGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Particle pulses along paths could go here */}

            <defs>
              <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0088ff" />
                <stop offset="50%" stopColor="#00ffcc" />
                <stop offset="100%" stopColor="#0088ff" />
              </linearGradient>
            </defs>
          </svg>

          {/* Architecture Nodes */}
          <div className="absolute w-full h-full inset-0 flex items-center justify-between px-16 z-10">
            <div className="arch-node flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)] flex items-center justify-center">
                <span className="text-2xl">🌐</span>
              </div>
              <span className="text-sm font-semibold text-gray-300">Client</span>
            </div>

            <div className="flex flex-col gap-32">
              <div className="arch-node flex flex-col items-center gap-3">
                <div className="w-24 h-16 rounded-xl bg-teal-500/10 border border-teal-500/30 shadow-[0_0_20px_rgba(20,184,166,0.2)] flex items-center justify-center">
                  <span className="font-mono text-teal-300">API GW</span>
                </div>
              </div>
              <div className="arch-node flex flex-col items-center gap-3">
                <div className="w-24 h-16 rounded-xl bg-teal-500/10 border border-teal-500/30 shadow-[0_0_20px_rgba(20,184,166,0.2)] flex items-center justify-center">
                  <span className="font-mono text-teal-300">Worker</span>
                </div>
              </div>
            </div>

            <div className="arch-node flex flex-col items-center gap-3">
              <div className="w-28 h-28 rounded-full bg-[#00ffcc]/10 border border-[#00ffcc]/30 shadow-[0_0_30px_rgba(0,255,204,0.2)] flex items-center justify-center">
                <span className="font-bold text-[#00ffcc] tracking-widest">CORE</span>
              </div>
            </div>

            <div className="arch-node flex flex-col items-center gap-3">
              <div className="w-20 h-24 rounded-lg bg-purple-500/10 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] flex items-center justify-center">
                <span className="text-2xl">🗄️</span>
              </div>
              <span className="text-sm font-semibold text-gray-300">Database</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
