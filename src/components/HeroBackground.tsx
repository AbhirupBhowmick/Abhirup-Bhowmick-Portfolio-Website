import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import gsap from 'gsap';

// Particle Field Component
const NeuralNetworkParticles = ({ count = 2000 }) => {
  const points = useRef<THREE.Points>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Generate random positions
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x -= delta / 10;
      points.current.rotation.y -= delta / 15;
      
      // Parallax effect
      points.current.position.x += (mousePosition.x * 0.5 - points.current.position.x) * 0.05;
      points.current.position.y += (mousePosition.y * 0.5 - points.current.position.y) * 0.05;
    }
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ffcc"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// Magnetic Button Component
const MagneticButton = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)"
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className="relative px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white font-medium overflow-hidden group transition-colors hover:bg-white/10"
      style={{
        boxShadow: "0 0 20px rgba(0, 255, 204, 0.1), inset 0 0 10px rgba(0, 255, 204, 0.1)"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(0,255,204,0.3)] to-transparent group-hover:via-[rgba(0,255,204,0.5)] transition-all duration-500 opacity-0 group-hover:opacity-100 blur-md"></div>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

// Main Hero Background Component
const HeroBackground = () => {
  return (
    <div className="relative w-full h-screen bg-gray-950 overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <NeuralNetworkParticles />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, staggerChildren: 0.2 }}
          className="text-center pointer-events-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-[#00ffcc] to-blue-500 mb-6"
          >
            Anti-Gravity Architecture
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Experience the next evolution of web interfaces. Neural-linked interfaces powered by advanced 3D rendering and reactive micro-interactions.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <MagneticButton>Initialize Sequence</MagneticButton>
            <MagneticButton>Explore Documentation</MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroBackground;
