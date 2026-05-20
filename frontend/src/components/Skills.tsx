"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Cpu, Server, Layout, Network } from "lucide-react";
import { ReactFlow, Background, useNodesState, useEdgesState, Handle, Position } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Skills domain data for the right panel
const skillLayers = [
  {
    title: "AI / ML CORE",
    description: "Intelligent systems integration, retrieval-augmented generation, and multimodal language models.",
    icon: <Cpu size={16} className="text-gray-400" />,
    skills: ["RAG Architecture", "Gemini API", "Multimodal LLMs", "Neo4j"]
  },
  {
    title: "BACKEND / INFRA",
    description: "High-performance APIs, robust database design, and scalable backend services.",
    icon: <Server size={16} className="text-gray-400" />,
    skills: ["Java", "Spring Boot", "PostgreSQL", "Node.js"]
  },
  {
    title: "SYSTEM DESIGN",
    description: "Architecting distributed systems, containerization, and modern deployment pipelines.",
    icon: <Network size={16} className="text-gray-400" />,
    skills: ["REST APIs", "Docker", "CI/CD", "Graph DBs"]
  },
  {
    title: "FRONTEND / INTERACTION",
    description: "Building responsive, component-driven user interfaces with modern web technologies.",
    icon: <Layout size={16} className="text-gray-400" />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  }
];

// Custom Node Component to match the design system
const CustomNode = React.memo(({ data }: any) => {
  return (
    <div className="relative px-3 py-2.5 bg-[#18181b]/90 border border-white/5 hover:border-white/20 transition-all duration-300 rounded-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] group min-w-[140px] backdrop-blur-md">
      {data.status && (
        <span className="absolute top-2 right-2 flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/20 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/40"></span>
        </span>
      )}
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-1.5 h-1.5 bg-white/25 border-none hover:bg-white transition-colors"
        style={{ left: '-4px' }}
      />
      
      <div className="text-[9px] font-mono tracking-widest text-white/30 uppercase mb-0.5 select-none">
        {data.category}
      </div>
      <div className="text-[11px] font-bold text-white tracking-wider uppercase select-none">
        {data.label}
      </div>
      
      <div className="max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 overflow-hidden transition-all duration-300 ease-in-out mt-1 text-[9px] text-white/50 leading-relaxed font-mono select-none">
        {data.description}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-1.5 h-1.5 bg-white/25 border-none hover:bg-white transition-colors"
        style={{ right: '-4px' }}
      />
    </div>
  );
});

CustomNode.displayName = "CustomNode";

const initialNodes = [
  // Column 1: Frontend
  {
    id: "react",
    type: "custom",
    position: { x: 20, y: 30 },
    data: { category: "Frontend", label: "React", description: "Component UI architecture", status: true },
  },
  {
    id: "nextjs",
    type: "custom",
    position: { x: 20, y: 110 },
    data: { category: "Frontend", label: "Next.js", description: "Server components & optimization" },
  },
  {
    id: "typescript",
    type: "custom",
    position: { x: 20, y: 190 },
    data: { category: "Frontend", label: "TypeScript", description: "Strict static typing validation" },
  },
  {
    id: "tailwind",
    type: "custom",
    position: { x: 20, y: 270 },
    data: { category: "Frontend", label: "Tailwind CSS", description: "Utility-first style engine" },
  },

  // Column 2: Backend
  {
    id: "restapi",
    type: "custom",
    position: { x: 210, y: 30 },
    data: { category: "Backend", label: "REST APIs", description: "Secure decoupled backend endpoints" },
  },
  {
    id: "nodejs",
    type: "custom",
    position: { x: 210, y: 110 },
    data: { category: "Backend", label: "Node.js", description: "Non-blocking V8 asynchronous runtime", status: true },
  },
  {
    id: "springboot",
    type: "custom",
    position: { x: 210, y: 190 },
    data: { category: "Backend", label: "Spring Boot", description: "Production enterprise backend runtime" },
  },
  {
    id: "java",
    type: "custom",
    position: { x: 210, y: 270 },
    data: { category: "Backend", label: "Java", description: "Secure scalable systems language" },
  },

  // Column 3: AI
  {
    id: "neo4j",
    type: "custom",
    position: { x: 400, y: 30 },
    data: { category: "AI Layer", label: "Neo4j", description: "Native graph database modeling" },
  },
  {
    id: "rag",
    type: "custom",
    position: { x: 400, y: 110 },
    data: { category: "AI Layer", label: "RAG Architecture", description: "Retrieval augmented vector context flow", status: true },
  },
  {
    id: "gemini",
    type: "custom",
    position: { x: 400, y: 190 },
    data: { category: "AI Layer", label: "Gemini API", description: "Multimodal intelligence API access" },
  },
  {
    id: "llms",
    type: "custom",
    position: { x: 400, y: 270 },
    data: { category: "AI Layer", label: "Multimodal LLMs", description: "Advanced text & vision reasoning models" },
  },

  // Column 4: Infrastructure
  {
    id: "vercel",
    type: "custom",
    position: { x: 590, y: 30 },
    data: { category: "Infrastructure", label: "Vercel", description: "Serverless edge cloud delivery" },
  },
  {
    id: "docker",
    type: "custom",
    position: { x: 590, y: 110 },
    data: { category: "Infrastructure", label: "Docker", description: "Isolated backend container instances", status: true },
  },
  {
    id: "postgres",
    type: "custom",
    position: { x: 590, y: 190 },
    data: { category: "Infrastructure", label: "PostgreSQL", description: "ACID-compliant storage engine" },
  },
  {
    id: "cicd",
    type: "custom",
    position: { x: 590, y: 270 },
    data: { category: "Infrastructure", label: "CI/CD", description: "Automated compile, test & release" },
  },
];

const initialEdges = [
  // Column 1 (Frontend) -> Column 2 (Backend)
  { id: "e-react-nodejs", source: "react", target: "nodejs", animated: true, style: { stroke: "rgba(255, 255, 255, 0.08)", strokeWidth: 1 } },
  { id: "e-nextjs-restapi", source: "nextjs", target: "restapi", animated: true, style: { stroke: "rgba(255, 255, 255, 0.08)", strokeWidth: 1 } },
  { id: "e-typescript-springboot", source: "typescript", target: "springboot", animated: true, style: { stroke: "rgba(255, 255, 255, 0.08)", strokeWidth: 1 } },
  
  // Column 2 (Backend) -> Column 3 (AI)
  { id: "e-restapi-rag", source: "restapi", target: "rag", animated: true, style: { stroke: "rgba(255, 255, 255, 0.08)", strokeWidth: 1 } },
  { id: "e-nodejs-gemini", source: "nodejs", target: "gemini", animated: true, style: { stroke: "rgba(255, 255, 255, 0.08)", strokeWidth: 1 } },
  { id: "e-springboot-neo4j", source: "springboot", target: "neo4j", animated: true, style: { stroke: "rgba(255, 255, 255, 0.08)", strokeWidth: 1 } },
  
  // Column 3 (AI) -> Column 4 (Infrastructure)
  { id: "e-rag-docker", source: "rag", target: "docker", animated: true, style: { stroke: "rgba(255, 255, 255, 0.08)", strokeWidth: 1 } },
  { id: "e-neo4j-postgres", source: "neo4j", target: "postgres", animated: true, style: { stroke: "rgba(255, 255, 255, 0.08)", strokeWidth: 1 } },
  { id: "e-gemini-vercel", source: "gemini", target: "vercel", animated: true, style: { stroke: "rgba(255, 255, 255, 0.08)", strokeWidth: 1 } },
  { id: "e-llms-cicd", source: "llms", target: "cicd", animated: true, style: { stroke: "rgba(255, 255, 255, 0.08)", strokeWidth: 1 } },
];

export default function Skills() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  return (
    <section id="stack" className="py-24 relative bg-[#09090b]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Skills Galaxy & Architecture
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl leading-relaxed">
            A systematic breakdown of technical capabilities across domains. Organized by functional layers rather than simple lists, reflecting actual architectural relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Real Interactive Architecture Diagram Area */}
          <div className="lg:col-span-7 bg-[#111113] border border-white/5 p-4 flex flex-col justify-between min-h-[480px] relative overflow-hidden group">
            {/* Scanline Sweep Effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.015] to-transparent h-1/2 w-full translate-y-[-100%] animate-[scanline_8s_linear_infinite]" />

            {/* Dashboard Header Bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 px-2 select-none">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/20 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white/40"></span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-white/60 uppercase">
                  LIVE TOPOLOGY // SYS_HEALTH: OPTIMAL
                </span>
              </div>
              <span className="text-[9px] font-mono text-white/20 uppercase">
                Interactive Grid View
              </span>
            </div>

            {/* React Flow Container */}
            <div className="flex-1 w-full min-h-[260px] sm:min-h-[380px] relative">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.05 }}
                minZoom={0.5}
                maxZoom={1.5}
                zoomOnScroll={false}
                preventScrolling={true}
                proOptions={{ hideAttribution: true }}
                className="w-full h-full text-white"
              >
                <Background color="rgba(255, 255, 255, 0.03)" gap={20} size={1} />
              </ReactFlow>
            </div>
          </div>

          {/* Functional Layers */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-4">
            {skillLayers.map((layer, idx) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  {layer.icon}
                  <h3 className="text-xs font-semibold tracking-widest text-white uppercase">
                    {layer.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  {layer.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {layer.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2 py-1 text-[10px] font-semibold tracking-widest uppercase text-gray-400 bg-black/50 border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
