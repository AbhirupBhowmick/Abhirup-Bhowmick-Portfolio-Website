import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  { role: "Senior Architecture Engineer", company: "CyberDyne Systems", year: "2024 - Present", desc: "Leading the development of Neural Sync core algorithms." },
  { role: "Full-Stack Developer", company: "Quantum Web", year: "2022 - 2024", desc: "Built highly scalable microservices and edge databases." },
  { role: "Frontend Developer", company: "Neo UI", year: "2020 - 2022", desc: "Created immersive 3D web experiences using WebGL." },
];

export const ExperienceTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    // Animate the vertical line drawing down
    gsap.fromTo(lineRef.current,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      }
    );

    // Animate nodes popping in
    const nodes = gsap.utils.toArray('.timeline-node');
    nodes.forEach((node: any, i) => {
      gsap.fromTo(node,
        { scale: 0, opacity: 0, boxShadow: "0 0 0px rgba(0,255,204,0)" },
        {
          scale: 1, opacity: 1, 
          boxShadow: "0 0 20px rgba(0,255,204,0.6)",
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: node,
            start: "top center+=100",
            toggleActions: "play none none reverse"
          }
        }
      );
      
      const content = node.parentElement.querySelector('.timeline-content');
      gsap.fromTo(content,
        { x: i % 2 === 0 ? 50 : -50, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top center+=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, []);

  return (
    <div className="bg-gray-950 min-h-screen text-white font-sans py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Timeline Section */}
        <div className="mb-32">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-24 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-[#00ffcc]">
            Experience Core
          </h2>
          
          <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">
            {/* Background Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white/5 rounded-full" />
            
            {/* Glowing Animated Line */}
            <div 
              ref={lineRef}
              className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-[#00ffcc] via-blue-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(0,255,204,0.8)]"
            />

            {experiences.map((exp, idx) => (
              <div key={idx} className={`relative flex items-center justify-between w-full mb-20 ${idx % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                {/* Node */}
                <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gray-900 border-4 border-[#00ffcc] z-10 timeline-node" />
                
                {/* Content */}
                <div className={`w-5/12 timeline-content ${idx % 2 === 0 ? 'text-left' : 'text-right'}`}>
                  <div className="p-6 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/10 hover:border-[#00ffcc]/30 transition-colors">
                    <span className="text-sm font-mono text-[#00ffcc] mb-2 block">{exp.year}</span>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                    <h4 className="text-lg text-gray-400 mb-4">{exp.company}</h4>
                    <p className="text-gray-500">{exp.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intelligence / GitHub Section */}
        <div className="mt-32">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Uplink</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Commit Graph Simulation */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/5"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub Uplink
              </h3>
              <div className="grid grid-cols-12 gap-1 gap-y-2">
                {[...Array(60)].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.random() * 0.5, duration: 0.3 }}
                    className={`w-full aspect-square rounded-sm ${Math.random() > 0.7 ? 'bg-[#00ffcc] shadow-[0_0_8px_rgba(0,255,204,0.5)]' : Math.random() > 0.4 ? 'bg-[#00ffcc]/40' : 'bg-white/5'}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Language Progress */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/5 flex flex-col justify-center gap-6"
            >
              <h3 className="text-xl font-semibold mb-2">Linguistic Distribution</h3>
              {[
                { lang: 'TypeScript', pct: 65, color: 'bg-blue-400' },
                { lang: 'Python', pct: 20, color: 'bg-yellow-400' },
                { lang: 'Go', pct: 15, color: 'bg-[#00ffcc]' },
              ].map((item, i) => (
                <div key={item.lang}>
                  <div className="flex justify-between text-sm mb-2 text-gray-400">
                    <span>{item.lang}</span>
                    <motion.span
                       initial={{ opacity: 0 }}
                       whileInView={{ opacity: 1 }}
                       viewport={{ once: true }}
                       transition={{ delay: 0.5 + (i * 0.2) }}
                    >{item.pct}%</motion.span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + (i * 0.2), ease: "easeOut" }}
                      className={`h-full ${item.color} shadow-[0_0_10px_currentColor]`}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};
