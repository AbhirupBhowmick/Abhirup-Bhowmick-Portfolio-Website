"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal, Mail, Smartphone, RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react";

const GithubIcon = ({ className, size = 18 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

const LinkedinIcon = ({ className, size = 18 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export default function ContactPortal() {
  // Form values state
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Engineering Role",
    customSubject: "",
    message: "",
    honeypot: "" // invisible spam-trap
  });

  // State machine for submission: 'idle' | 'sending' | 'success' | 'failed'
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "failed">("idle");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const presets = [
    "Engineering Role",
    "AI Systems Opportunity",
    "Technical Collaboration",
    "Backend Engineering Inquiry",
    "Freelance / Contract Work",
    "Open Source Discussion",
    "General Inquiry",
    "Custom"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Run dynamic terminal log streaming simulation during transmit
  const runTransmissionSequence = async () => {
    setTerminalLogs(["system~ Encrypting communication payload..."]);
    await new Promise(r => setTimeout(r, 600));
    setTerminalLogs(prev => [...prev, "system~ Establishing secure relay..."]);
    await new Promise(r => setTimeout(r, 600));
    setTerminalLogs(prev => [...prev, "system~ Routing transmission..."]);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    // Simple validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMessage("Required fields (Name, Email, Message) must be filled.");
      setStatus("failed");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    // Start UI logging timeline
    const logPromise = runTransmissionSequence();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const result = await response.json();
      await logPromise; // Ensure animations sync cleanly

      if (response.ok && result.success) {
        setTerminalLogs(prev => [
          ...prev, 
          "system~ Payload delivered successfully.",
          "system~ Secure communication node established."
        ]);
        await new Promise(r => setTimeout(r, 800));
        setStatus("success");
        
        // Dispatch success signal to AI Context Engine terminal
        const event = new CustomEvent("execute-ai-query", { 
          detail: { query: 'system~ Secure communication channel established.' } 
        });
        window.dispatchEvent(event);
      } else {
        throw new Error(result.error || "Secure relay timeout detected.");
      }
    } catch (err: any) {
      console.error(err);
      setTerminalLogs(prev => [
        ...prev, 
        "system~ Secure relay failed.",
        "system~ Retry transmission."
      ]);
      setErrorMessage("system~ Secure relay failed. Retry transmission.");
      await new Promise(r => setTimeout(r, 800));
      setStatus("failed");
    }
  };

  // Reset form to write a new message
  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      subject: "Engineering Role",
      customSubject: "",
      message: "",
      honeypot: ""
    });
    setStatus("idle");
    setTerminalLogs([]);
    setErrorMessage("");
  };

  return (
    <section id="contact" className="py-24 relative border-t border-white/5 bg-[#09090b]">
      <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[200px] bg-indigo-500/[0.01] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Initialize Connection
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl leading-relaxed">
            Establish a direct line for professional inquiries, technical collaborations, or engineering roles. All transmissions are routed directly to my secure inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Form Dashboard / Console */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 bg-[#111113] border border-white/5 p-5 sm:p-8 shadow-2xl flex flex-col relative rounded-sm min-h-[460px] justify-between"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 opacity-20" />
            
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.div
                  key="form-fields"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full justify-between gap-6"
                >
                  <div>
                    {/* Live Availability Status badge */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-950/20 border border-emerald-500/20 rounded-full self-start mb-6 max-w-max">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <div className="w-1.5 h-1.5 absolute rounded-full bg-emerald-400" />
                      <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                        OPEN TO AI SYSTEMS & BACKEND ROLES
                      </span>
                    </div>

                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                      {/* Honeypot Spam Trap (Hidden field) */}
                      <input 
                        type="text" 
                        name="honeypot" 
                        value={form.honeypot} 
                        onChange={handleInputChange} 
                        className="hidden" 
                        tabIndex={-1} 
                        autoComplete="off" 
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Name</label>
                          <input 
                            type="text" 
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name..."
                            required
                            className="w-full bg-[#09090b] border border-white/5 hover:border-white/15 focus:border-emerald-500/40 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:shadow-[0_0_15px_rgba(16,185,129,0.02)] transition-all font-mono"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Email</label>
                          <input 
                            type="email" 
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            placeholder="name@company.com"
                            required
                            className="w-full bg-[#09090b] border border-white/5 hover:border-white/15 focus:border-emerald-500/40 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:shadow-[0_0_15px_rgba(16,185,129,0.02)] font-mono transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Subject Presets</label>
                          <select 
                            name="subject"
                            value={form.subject}
                            onChange={handleInputChange}
                            className="w-full bg-[#09090b] border border-white/5 hover:border-white/15 focus:border-emerald-500/40 rounded-sm py-3 px-4 text-sm text-gray-300 focus:outline-none font-mono transition-all cursor-pointer"
                          >
                            {presets.map((preset) => (
                              <option key={preset} value={preset} className="bg-[#0c0c0e] text-white py-2">
                                {preset}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Custom Subject field dynamically revealed */}
                        <div className="flex flex-col gap-2">
                          {form.subject === "Custom" ? (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex flex-col gap-2"
                            >
                              <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Custom Subject</label>
                              <input 
                                type="text" 
                                name="customSubject"
                                value={form.customSubject}
                                onChange={handleInputChange}
                                placeholder="Enter custom subject..."
                                required={form.subject === "Custom"}
                                className="w-full bg-[#09090b] border border-white/5 hover:border-white/15 focus:border-emerald-500/40 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:shadow-[0_0_15px_rgba(16,185,129,0.02)] transition-all font-mono"
                              />
                            </motion.div>
                          ) : (
                            <div className="hidden md:flex flex-col gap-2 opacity-30 select-none">
                              <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Custom Subject</label>
                              <div className="w-full bg-[#09090b]/50 border border-white/5 rounded-sm py-3 px-4 text-sm text-gray-600 font-mono">
                                Presets Mode Enabled
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Message</label>
                        <textarea 
                          name="message"
                          value={form.message}
                          onChange={handleInputChange}
                          rows={5}
                          required
                          placeholder="Write your message here..."
                          className="w-full bg-[#09090b] border border-white/5 hover:border-white/15 focus:border-emerald-500/40 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:shadow-[0_0_15px_rgba(16,185,129,0.02)] resize-none transition-all"
                        ></textarea>
                      </div>

                      <button 
                        type="submit"
                        className="mt-2 w-full flex items-center justify-center gap-2 py-4 bg-white text-black hover:bg-gray-100 font-bold text-xs tracking-widest uppercase transition-all rounded-sm cursor-pointer"
                      >
                        <Send size={14} /> Send Message
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {status === "sending" && (
                <motion.div
                  key="sending-timeline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col justify-center min-h-[350px]"
                >
                  <div className="p-6 bg-black/40 border border-white/5 rounded-sm font-mono text-xs sm:text-sm flex flex-col gap-3">
                    <div className="flex items-center gap-2 pb-3 border-b border-white/5 text-gray-500">
                      <Terminal size={14} className="animate-spin text-emerald-500" />
                      <span>transmitting_payload.sh</span>
                    </div>
                    
                    <div className="space-y-2">
                      {terminalLogs.map((log, i) => (
                        <div key={i} className="text-gray-400">
                          {log}
                        </div>
                      ))}
                      <div className="flex items-center gap-1 text-emerald-500 animate-pulse">
                        <span>system~ Connecting to secure relay...</span>
                        <span className="w-1.5 h-3 bg-emerald-500 inline-block animate-ping" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {status === "success" && (
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center p-6 min-h-[350px] gap-4"
                >
                  <CheckCircle2 size={42} className="text-emerald-500 animate-pulse mb-2" />
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2">
                      Transmission Successful
                    </h3>
                    <p className="text-xs text-gray-500 font-mono">
                      system~ Secure communication channel established.
                    </p>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-[10px] uppercase tracking-wider transition-all rounded-sm cursor-pointer"
                  >
                    <RefreshCw size={12} /> New Connection
                  </button>
                </motion.div>
              )}

              {status === "failed" && (
                <motion.div
                  key="failed-screen"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center p-6 min-h-[350px] gap-4"
                >
                  <AlertTriangle size={42} className="text-red-500 animate-pulse mb-2" />
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2">
                      Transmission Failed
                    </h3>
                    <p className="text-xs text-gray-500 font-mono max-w-sm mx-auto">
                      {errorMessage || "system~ Secure relay timeout detected."}
                    </p>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-[10px] uppercase tracking-wider transition-all rounded-sm cursor-pointer"
                  >
                    <RefreshCw size={12} /> Retry Connection
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Side Channels & Links Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 flex flex-col gap-3"
          >
            <a href="https://github.com/AbhirupBhowmick" target="_blank" rel="noopener noreferrer" className="p-5 bg-[#111113] border border-white/5 hover:border-white/20 hover:bg-white/[0.02] flex items-center justify-between group transition-all rounded-sm">
              <div className="flex items-center gap-4">
                <GithubIcon className="text-gray-400 group-hover:text-white transition-colors" size={20} />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-1">GITHUB</h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">ACTIVE</p>
                </div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-500 transition-colors shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            </a>

            <a href="https://www.linkedin.com/in/abhirup111" target="_blank" rel="noopener noreferrer" className="p-5 bg-[#111113] border border-white/5 hover:border-white/20 hover:bg-white/[0.02] flex items-center justify-between group transition-all rounded-sm">
              <div className="flex items-center gap-4">
                <LinkedinIcon className="text-gray-400 group-hover:text-white transition-colors" size={20} />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-1">LINKEDIN</h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">AVAILABLE</p>
                </div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-500 transition-colors shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            </a>

            <a href="mailto:abhirupbhowmick111777@gmail.com" className="p-5 bg-[#111113] border border-white/5 hover:border-white/20 hover:bg-white/[0.02] flex items-center justify-between group transition-all rounded-sm">
              <div className="flex items-center gap-4">
                <Mail className="text-gray-400 group-hover:text-white transition-colors" size={20} />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-1">EMAIL</h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">SECURE CHANNEL</p>
                </div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            </a>

            <a href="https://wa.me/919330789221" target="_blank" rel="noopener noreferrer" className="p-5 bg-[#111113] border border-white/5 hover:border-white/20 hover:bg-white/[0.02] flex items-center justify-between group transition-all rounded-sm">
              <div className="flex items-center gap-4">
                <Smartphone className="text-gray-400 group-hover:text-white transition-colors" size={20} />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-1">WHATSAPP</h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">DIRECT LINE</p>
                </div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-500 transition-colors shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            </a>
            
            <div className="mt-auto pt-2">
              <div className="p-4 border border-white/5 bg-[#111113] text-[10px] text-gray-600 font-mono flex items-center justify-between rounded-sm">
                <span className="flex items-center gap-2"><Terminal size={10} /> SYSTEM.READY</span>
                <span>UTC+5:30</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
