import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data
const skillsData = [
  { id: '1', name: 'React', category: 'Frontend', level: 'Expert', projects: 12, position: [2, 1, 0] as [number, number, number] },
  { id: '2', name: 'Three.js', category: 'Frontend', level: 'Advanced', projects: 5, position: [1.5, 2.5, -1] as [number, number, number] },
  { id: '3', name: 'Node.js', category: 'Backend', level: 'Expert', projects: 15, position: [-2, -1, 1] as [number, number, number] },
  { id: '4', name: 'Python', category: 'Backend', level: 'Advanced', projects: 8, position: [-3, 0.5, -0.5] as [number, number, number] },
  { id: '5', name: 'TypeScript', category: 'Frontend', level: 'Expert', projects: 20, position: [0.5, -2, 1.5] as [number, number, number] },
  { id: '6', name: 'PostgreSQL', category: 'Database', level: 'Advanced', projects: 10, position: [-1, -2.5, -1.5] as [number, number, number] },
  { id: '7', name: 'MongoDB', category: 'Database', level: 'Intermediate', projects: 6, position: [0, -3, 0] as [number, number, number] },
  { id: '8', name: 'AWS', category: 'DevOps', level: 'Advanced', projects: 7, position: [3, -1, -2] as [number, number, number] },
  { id: '9', name: 'Docker', category: 'DevOps', level: 'Expert', projects: 14, position: [2.5, -2.5, 0.5] as [number, number, number] },
  { id: '10', name: 'GraphQL', category: 'Backend', level: 'Intermediate', projects: 4, position: [-1.5, 1.5, 2] as [number, number, number] },
];

const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps'];

const SkillNode = ({ skill, activeCategory, hoveredSkill, setHoveredSkill }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  const isActive = activeCategory === 'All' || activeCategory === skill.category;
  const isHovered = hoveredSkill?.id === skill.id;

  // Colors
  const baseColor = useMemo(() => new THREE.Color(isActive ? '#00ffcc' : '#334455'), [isActive]);
  const glowColor = useMemo(() => new THREE.Color(isActive ? '#ffffff' : '#334455'), [isActive]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      
      // Pulse effect if active
      if (isActive && !isHovered) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + skill.id.charCodeAt(0)) * 0.05;
        meshRef.current.scale.setScalar(scale);
      } else if (isHovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }

    if (materialRef.current) {
      materialRef.current.color.lerp(baseColor, 0.1);
      materialRef.current.emissive.lerp(isHovered ? glowColor : baseColor, 0.1);
      materialRef.current.emissiveIntensity = isActive ? (isHovered ? 1.5 : 0.5) : 0.1;
      materialRef.current.opacity = isActive ? 1 : 0.3;
    }
  });

  return (
    <group position={skill.position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredSkill(skill);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHoveredSkill(null);
          document.body.style.cursor = 'auto';
        }}
      >
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial 
          ref={materialRef}
          transparent
          wireframe={isHovered}
        />
      </mesh>
      
      {/* Label always visible but dimmed when inactive */}
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.25}
        color={isActive ? "#ffffff" : "#666666"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {skill.name}
      </Text>
    </group>
  );
};

const ConstellationLines = ({ skills, activeCategory }: any) => {
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const activeSkills = skills.filter((s: any) => activeCategory === 'All' || s.category === activeCategory);
    
    // Connect nodes in same category
    for (let i = 0; i < activeSkills.length; i++) {
      for (let j = i + 1; j < activeSkills.length; j++) {
        const s1 = activeSkills[i];
        const s2 = activeSkills[j];
        
        if (s1.category === s2.category) {
          const dist = new THREE.Vector3(...s1.position).distanceTo(new THREE.Vector3(...s2.position));
          if (dist < 4) {
            points.push(new THREE.Vector3(...s1.position));
            points.push(new THREE.Vector3(...s2.position));
          }
        }
      }
    }
    
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [skills, activeCategory]);

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial color="#00ffcc" transparent opacity={0.2} />
    </lineSegments>
  );
};

const SkillsGalaxy = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<any>(null);

  return (
    <div className="relative w-full h-screen bg-gray-950 overflow-hidden font-sans">
      {/* Category Filter UI */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 flex gap-4 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat 
                ? 'bg-[#00ffcc]/20 text-[#00ffcc] border border-[#00ffcc]/50 shadow-[0_0_15px_rgba(0,255,204,0.3)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ffcc" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0088ff" />
          
          <group rotation={[0.2, 0.5, 0]}>
            {skillsData.map(skill => (
              <SkillNode 
                key={skill.id} 
                skill={skill} 
                activeCategory={activeCategory}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
              />
            ))}
            <ConstellationLines skills={skillsData} activeCategory={activeCategory} />
          </group>
          
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            minDistance={4}
            maxDistance={12}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Hover Tooltip Overlay */}
      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 min-w-[280px] p-6 bg-gray-900/80 backdrop-blur-xl border border-[#00ffcc]/30 rounded-2xl shadow-[0_0_30px_rgba(0,255,204,0.15)] pointer-events-none"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#00ffcc] animate-pulse"></div>
              <h3 className="text-xl font-bold text-white m-0">{hoveredSkill.name}</h3>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Proficiency</span>
                <span className="text-sm font-semibold text-teal-300">{hoveredSkill.level}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Projects</span>
                <span className="text-sm font-semibold text-teal-300">{hoveredSkill.projects}+ Deployed</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">
                {hoveredSkill.category} Subsystem
              </span>
              <span className="text-xs text-[#00ffcc]">Node Active</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillsGalaxy;
