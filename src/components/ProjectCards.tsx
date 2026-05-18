import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const ProjectCard = ({ title, description, tags, index }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full max-w-sm rounded-2xl p-6 cursor-pointer bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      <div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" 
        style={{ transform: "translateZ(-1px)" }} 
      />
      
      <div style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-2xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-500">
          {title}
        </h3>
        <p className="text-gray-400 mb-6 line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: string) => (
            <span key={tag} className="text-xs px-2 py-1 rounded-md bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/20">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Glow effect on hover */}
      <motion.div 
        className="absolute -inset-px rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(0, 255, 204, 0.15), transparent 40%)",
          transform: "translateZ(1px)"
        }}
      />
    </motion.div>
  );
};

export const ProjectsUniverse = () => {
  const projects = [
    { title: "Neural Sync Core", description: "Real-time state synchronization engine using WebSockets and conflict-free replicated data types.", tags: ["Node.js", "Redis", "CRDTs"] },
    { title: "Gravity DB", description: "Distributed highly-available document store with intelligent edge caching.", tags: ["Go", "Raft", "gRPC"] },
    { title: "Quantum API Gateway", description: "High-throughput edge routing and rate limiting with dynamic configuration.", tags: ["Rust", "WASM", "Envoy"] },
  ];

  return (
    <div className="min-h-screen bg-gray-950 py-24 px-6 relative overflow-hidden font-sans perspective-1000">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-center text-white mb-16 tracking-tight">
          Projects <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-[#00ffcc]">Universe</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {projects.map((proj, idx) => (
            <ProjectCard key={proj.title} {...proj} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};
