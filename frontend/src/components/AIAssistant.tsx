"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, Send, Command, Cpu } from "lucide-react";

interface LogLine {
  type: "system" | "user" | "output";
  text: string;
}

const KNOWLEDGE_BASE: Record<string, string[]> = {
  help: [
    "system~ Executing help subsystem...",
    "AVAILABLE COMMANDS:",
    "  about          - Developer core profile",
    "  projects       - Overview of key engineering builds",
    "  skills         - Comprehensive competency stack",
    "  experience     - Experience timeline summary",
    "  stack          - Architectural stack configuration",
    "  contact        - Direct communications portal",
    "  clear          - Reset terminal screen",
    "",
    "ADVANCED QUERY FORMAT:",
    "  query --project \"[name]\"  (e.g., query --project \"Visi Core AI\")",
    "  query --skill \"[name]\"    (e.g., query --skill \"Spring Boot\")",
    "  query --role \"[name]\"     (e.g., query --role \"IDEAS-TIH\")",
    "  query --focus \"[name]\"    (e.g., query --focus \"AI Systems\")"
  ],
  about: [
    "system~ Searching semantic graph...",
    "system~ Cross-referencing architect profile...",
    "system~ Semantic confidence: 99.4%",
    "",
    "ABHIRUP BHOWMICK // SOFTWARE & AI SYSTEMS ENGINEER",
    "→ Systems-focused engineer specializing in distributed applications, knowledge graphs, and RAG pipelines.",
    "→ Deep interest in building performant backend microservices and responsive user topologies.",
    "→ Academic background: B.Tech in CSE (Artificial Intelligence & Machine Learning) from Brainware University."
  ],
  projects: [
    "system~ Querying repositories metadata...",
    "system~ Matching systems architecture nodes...",
    "system~ Found 3 active production pipelines:",
    "",
    "1. VISI CORE AI",
    "   - Real-time multimodal AI systems coordinator.",
    "   - Stack: Next.js, Vercel AI SDK, Gemini API.",
    "2. RESUMATCH AI",
    "   - AI-powered document parse & ATS scoring agent.",
    "   - Stack: Next.js, FastAPI, PostgreSQL.",
    "3. SECOND BRAIN AI",
    "   - Full-stack knowledge graph editor.",
    "   - Stack: Spring Boot, Neo4j, React.",
    "",
    "Tip: Type 'query --project \"[name]\"' for deep architectural details."
  ],
  skills: [
    "system~ Retrieving competency taxonomy...",
    "system~ Matching active skills matrix...",
    "",
    "LANGUAGES       :: Java, TypeScript, JavaScript, Python, HTML/CSS, SQL",
    "BACKEND STACK   :: Spring Boot, Node.js, Express, REST APIs, RESTful microservices",
    "FRONTEND STACK  :: React, Next.js, Framer Motion, Tailwind CSS, React Flow",
    "DATABASES       :: Neo4j (Graph), PostgreSQL (Relational), MySQL",
    "INFRASTRUCTURE  :: Docker, Git, CI/CD pipelines, Vercel, Render",
    "AI SYSTEMS      :: Retrieval-Augmented Generation (RAG), Vector Embeddings, LLM Orchestration"
  ],
  experience: [
    "system~ Querying experience directory...",
    "system~ Matching professional records...",
    "",
    "1. AI DEVELOPER INTERN // IDEAS-TIH (ISI Kolkata)",
    "   - Period: Dec 2024 - Present",
    "   - Focus: Distributed semantic knowledge graphs, Neo4j architecture, RAG pipelines.",
    "2. FRONTEND DEVELOPER INTERN // GAMEONIX",
    "   - Period: Jul 2024 - Sep 2024",
    "   - Focus: High-performance user interfaces, React/Next.js dashboard engineering."
  ],
  stack: [
    "system~ Retrieving system topology parameters...",
    "ACTIVE PORTFOLIO SYSTEMS DESIGN:",
    "→ Core Engine      : Next.js 16.2.6 (Turbopack, Serverless Runtime)",
    "→ Viewport Layer   : React 19 Client Topologies",
    "→ Interaction Bus  : Framer Motion & GSAP Orchestrator",
    "→ Graph Topology   : @xyflow/react Systems Visualization Engine",
    "→ Telemetry Bus    : GitHub REST/GraphQL API integration with SWR caching"
  ],
  contact: [
    "system~ Initializing direct bridge...",
    "system~ Opening communication pathways...",
    "",
    "CONTACT ENDPOINTS:",
    "→ Email        : abhirupbhowmick111777@gmail.com",
    "→ LinkedIn     : https://www.linkedin.com/in/abhirup111",
    "→ GitHub       : https://github.com/AbhirupBhowmick",
    "→ WhatsApp     : +91 9330789221 (https://wa.me/919330789221)"
  ]
};

const SPECIFIC_QUERIES: Record<string, string[]> = {
  "project-visicore": [
    "system~ Retrieving semantic context...",
    "system~ Matching architecture nodes...",
    "system~ Confidence score: 98.2%",
    "",
    "Visi Core AI:",
    "→ Real-time multimodal intelligence platform.",
    "→ Architecture: Next.js serverless orchestration, Vercel AI SDK integration.",
    "→ Engine: Streaming Server-Sent Events (SSE) for low-latency AI responses.",
    "→ Deployment: Optimized Vercel edge deployment."
  ],
  "project-secondbrain": [
    "system~ Retrieving semantic context...",
    "system~ Matching architecture nodes...",
    "system~ Confidence score: 96.8%",
    "",
    "Second Brain AI:",
    "→ Distributed knowledge graph visualization and semantic notes database.",
    "→ Architecture: Spring Boot backend, Neo4j graph database, React frontend.",
    "→ Engine: Custom Cypher query builders to map concept relations.",
    "→ Deployment: Render blueprint multi-service configuration."
  ],
  "project-resumatch": [
    "system~ Retrieving semantic context...",
    "system~ Matching architecture nodes...",
    "system~ Confidence score: 97.4%",
    "",
    "ResuMatch AI:",
    "→ AI-powered resume parser and ATS evaluation agent.",
    "→ Architecture: FastAPI python engine, Next.js dashboard UI, PostgreSQL store.",
    "→ Engine: Vector similarity search matching resumes against job descriptions.",
    "→ Deployment: Containerized Docker setup."
  ],
  "skill-springboot": [
    "system~ Searching semantic graph...",
    "system~ Retrieving engineering metadata...",
    "system~ Confidence: 95.8%",
    "",
    "Competency: Spring Boot Backend Development",
    "→ Architected enterprise RESTful web microservices and data ingest pipelines.",
    "→ Secured services with OAuth2, JWT tokens, and spring security filters.",
    "→ Integrated relational (PostgreSQL) and graph (Neo4j) database persistence layers."
  ],
  "role-ideas": [
    "system~ Querying institutional archive...",
    "system~ Retrieving engineering logs...",
    "",
    "Professional Role: AI Developer Intern @ IDEAS-TIH (ISI Kolkata)",
    "→ Engineered custom RAG pipelines using LangChain and Neo4j databases.",
    "→ Created hierarchical semantic knowledge graphs representing academic profiles.",
    "→ Built optimized Cypher queries to perform multi-hop relational path searches."
  ],
  "focus-ai": [
    "system~ Retrieving core philosophy node...",
    "",
    "Philosophy: AI Systems & Architecture Focus",
    "→ Rejecting simple wrappers: building robust orchestration pipelines from scratch.",
    "→ Focus on structured outputs, semantic validation layers, and custom data connectors.",
    "→ Engineering low-latency streaming endpoints to maximize user interface response speeds."
  ]
};

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<LogLine[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  
  // Command History States
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal body to bottom on updates
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // Initial boot sequence on mount
  useEffect(() => {
    const playBoot = async () => {
      await streamLines([
        "system~ Initializing semantic runtime...",
        "system~ Loading knowledge graph...",
        "system~ 1,204 semantic nodes available.",
        "system~ RAG pipeline initialized.",
        "system~ Awaiting prompt..."
      ]);
    };
    playBoot();
  }, []);

  // Listen to remote focus and query execution calls
  useEffect(() => {
    const handleFocus = () => {
      setIsActive(true);
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
      setTimeout(() => setIsActive(false), 2000);
    };

    const handleExecuteQuery = (e: Event) => {
      const customEvent = e as CustomEvent<{ query: string }>;
      if (customEvent.detail?.query) {
        setIsActive(true);
        handleExecuteCommand(customEvent.detail.query);
        setTimeout(() => setIsActive(false), 2000);
      }
    };

    window.addEventListener('focus-ai-terminal', handleFocus);
    window.addEventListener('execute-ai-query', handleExecuteQuery);
    return () => {
      window.removeEventListener('focus-ai-terminal', handleFocus);
      window.removeEventListener('execute-ai-query', handleExecuteQuery);
    };
  }, [isStreaming]);

  // Streaming text animation engine
  const streamLines = async (lines: string[]) => {
    setIsStreaming(true);
    for (const line of lines) {
      const isSystemLog = line.startsWith("system~");
      
      // Append a placeholder row
      setTerminalLogs(prev => [...prev, { type: isSystemLog ? "system" : "output", text: "" }]);
      
      if (line.length === 0) {
        await new Promise(resolve => setTimeout(resolve, 80));
        continue;
      }

      let currentText = "";
      // Adjust speed dynamically based on line size
      const charDelay = line.length > 60 ? 1 : 5;
      
      for (let i = 0; i < line.length; i++) {
        currentText += line[i];
        setTerminalLogs(prev => {
          const next = [...prev];
          next[next.length - 1] = { 
            type: isSystemLog ? "system" : "output", 
            text: currentText 
          };
          return next;
        });
        await new Promise(resolve => setTimeout(resolve, charDelay));
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    setIsStreaming(false);
    
    // Auto-focus input box after stream terminates
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    }, 50);
  };

  // Command executor
  const handleExecuteCommand = async (cmd: string) => {
    if (isStreaming) return;
    
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Log the user's action
    setTerminalLogs(prev => [...prev, { type: "user", text: `> ${trimmedCmd}` }]);
    setInput("");
    
    // Store in history
    setHistory(prev => {
      const updated = [trimmedCmd, ...prev];
      return updated.slice(0, 50); // limit history to 50 items
    });
    setHistoryIdx(-1);

    const lowerCmd = trimmedCmd.toLowerCase();
    
    // 1. Clear command
    if (lowerCmd === "clear") {
      setTerminalLogs([]);
      await streamLines([
        "system~ Console buffers flushed.",
        "system~ Awaiting prompt..."
      ]);
      return;
    }

    // 2. Exact matches from primary knowledge base
    if (KNOWLEDGE_BASE[lowerCmd]) {
      await streamLines(KNOWLEDGE_BASE[lowerCmd]);
      return;
    }

    // 3. Advanced query parameters parser
    // query --project "Visi Core AI"
    const queryRegex = /^query\s+--([a-zA-Z]+)\s+["'](.+?)["']/i;
    const match = trimmedCmd.match(queryRegex);
    
    if (match) {
      const type = match[1].toLowerCase();
      const value = match[2].trim().toLowerCase();

      await new Promise(resolve => setTimeout(resolve, 100));

      if (type === "project") {
        if (value.includes("visi")) {
          await streamLines(SPECIFIC_QUERIES["project-visicore"]);
        } else if (value.includes("second") || value.includes("brain")) {
          await streamLines(SPECIFIC_QUERIES["project-secondbrain"]);
        } else if (value.includes("match") || value.includes("resu")) {
          await streamLines(SPECIFIC_QUERIES["project-resumatch"]);
        } else {
          await streamLines([
            "system~ Searching semantic graph...",
            `system~ No exact project records for: "${match[2]}"`,
            "system~ Try matching against: 'Visi Core AI', 'Second Brain AI', or 'ResuMatch AI'."
          ]);
        }
      } else if (type === "skill" || type === "skills") {
        if (value.includes("spring") || value.includes("boot") || value.includes("java")) {
          await streamLines(SPECIFIC_QUERIES["skill-springboot"]);
        } else if (value.includes("backend") || value.includes("ai")) {
          await streamLines(SPECIFIC_QUERIES["focus-ai"]);
        } else {
          // Fallback to searching global skills text
          await streamLines([
            "system~ Scanning active skills map...",
            "system~ Matching taxonomy node...",
            "",
            `Competency: ${match[2]}`,
            "→ Integrated in active developer skills inventory.",
            "→ Type 'skills' to view a full structural outline of my technology stack."
          ]);
        }
      } else if (type === "role") {
        if (value.includes("ideas") || value.includes("tih") || value.includes("isi")) {
          await streamLines(SPECIFIC_QUERIES["role-ideas"]);
        } else {
          await streamLines([
            "system~ Querying professional experience logs...",
            `system~ No specific logs for: "${match[2]}"`,
            "system~ Try querying role: 'query --role \"IDEAS-TIH\"'"
          ]);
        }
      } else if (type === "focus") {
        if (value.includes("ai") || value.includes("system")) {
          await streamLines(SPECIFIC_QUERIES["focus-ai"]);
        } else {
          await streamLines([
            "system~ Checking architecture logs...",
            `system~ Focus parameter "${match[2]}" not resolved.`,
            "system~ Defaulting to query: query --focus \"AI Systems\""
          ]);
        }
      } else {
        await streamLines([
          "system~ Argument error: unrecognized query selector.",
          "system~ Use --project, --skill, --role, or --focus."
        ]);
      }
      return;
    }

    // 4. Fallback command not recognized
    await streamLines([
      "system~ Command not recognized.",
      "system~ Type \"help\" for available commands."
    ]);
  };

  // Input keystroke interceptor
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleExecuteCommand(input);
    } else if (e.key === "ArrowUp") {
      // Traverse history backwards
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx < history.length) {
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      // Traverse history forwards
      e.preventDefault();
      const nextIdx = historyIdx - 1;
      if (nextIdx >= 0) {
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      } else {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  return (
    <section id="ai-assistant" className="py-24 relative border-t border-white/5 bg-[#09090b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 flex flex-col lg:flex-row gap-12 lg:items-center">
        
        {/* Left Side Info Panel */}
        <div className="lg:w-1/3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 flex items-center gap-3">
            <Cpu size={28} className="text-gray-400" /> AI Context Engine
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">
            Query my experience, tech stack, or engineering philosophy directly. Powered by a custom RAG pipeline connected to my personal knowledge graph.
          </p>
          
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Suggested Queries</p>
            {[
              'query --project "Visi Core AI"', 
              'query --role "IDEAS-TIH"', 
              'query --skills "Backend & AI"'
            ].map((cmd) => (
              <button 
                key={cmd}
                disabled={isStreaming}
                onClick={() => handleExecuteCommand(cmd)}
                className="block w-full text-left px-4 py-3 bg-[#111113] border border-white/5 hover:border-white/20 disabled:opacity-50 disabled:hover:border-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.02)] transition-all text-sm text-gray-300 font-mono cursor-pointer rounded-sm"
              >
                &gt; {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side Terminal Body */}
        <div className="lg:w-2/3">
          <motion.div 
            animate={isActive ? { scale: [1, 1.01, 1], borderColor: ["rgba(255,255,255,0.1)", "rgba(16,185,129,0.5)", "rgba(255,255,255,0.1)"] } : {}}
            transition={{ duration: 0.8 }}
            className={`backdrop-blur-md bg-black/30 border ${isActive ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1),inset_0_1px_0_0_rgba(255,255,255,0.05)]' : 'border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.02)]'} rounded-sm overflow-hidden flex flex-col h-[420px] transition-all duration-500`}
          >
            {/* Terminal Header */}
            <div className="h-10 bg-white/[0.02] border-b border-white/5 flex items-center px-4 justify-between select-none">
              <div className="flex items-center gap-2">
                <Terminal size={14} className={isActive ? "text-emerald-500 animate-pulse" : "text-gray-500"} />
                <span className="text-xs font-mono text-gray-500">context_engine_v2.0.sh</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
              </div>
            </div>

            {/* Terminal Body Screen */}
            <div 
              ref={terminalBodyRef}
              className="flex-1 p-6 overflow-y-auto flex flex-col gap-3 font-mono text-xs md:text-sm custom-scrollbar bg-black/10"
            >
              {terminalLogs.map((log, index) => {
                if (log.type === "user") {
                  return (
                    <div key={index} className="text-white font-bold pl-2 select-text">
                      {log.text}
                    </div>
                  );
                } else if (log.type === "system") {
                  return (
                    <div key={index} className="flex gap-2 text-emerald-500/80 leading-relaxed select-text">
                      <span className="text-emerald-500 shrink-0 select-none">system~</span>
                      <p>{log.text}</p>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="text-gray-400 pl-4 whitespace-pre-wrap leading-relaxed select-text">
                      {log.text}
                    </div>
                  );
                }
              })}
              
              {/* Active streaming blink indicator */}
              {isStreaming && (
                <div className="flex items-center gap-1 pl-4">
                  <span className="inline-block w-1.5 h-3.5 bg-emerald-500 animate-pulse" />
                </div>
              )}
            </div>

            {/* Terminal Input Bar */}
            <div className="p-4 bg-black/40 backdrop-blur-md border-t border-white/5">
              <div className="relative flex items-center">
                <Command size={14} className="absolute left-3 text-gray-500" />
                <input 
                  id="ai-terminal-input"
                  ref={inputRef}
                  type="text" 
                  value={input}
                  disabled={isStreaming}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isStreaming ? "Streaming response..." : "Type command (e.g. 'help')..."}
                  className="w-full bg-transparent border border-white/10 rounded-sm py-3 pl-9 pr-12 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500/50 disabled:text-white/20 disabled:border-white/5 font-mono transition-colors"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
                <button 
                  disabled={isStreaming || !input.trim()}
                  onClick={() => handleExecuteCommand(input)}
                  className="absolute right-3 text-gray-500 hover:text-white disabled:opacity-30 disabled:hover:text-gray-500 transition-colors cursor-pointer p-1"
                  aria-label="Send query"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
