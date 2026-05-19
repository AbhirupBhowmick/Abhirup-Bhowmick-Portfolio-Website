"use client";

import { motion } from "framer-motion";
import { Send, Terminal, Mail, Smartphone } from "lucide-react";

const GithubIcon = ({ className, size = 18 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

const LinkedinIcon = ({ className, size = 18 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export default function ContactPortal() {
  return (
    <section id="contact" className="py-24 relative border-t border-white/5 bg-[#09090b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Initialize Connection
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl leading-relaxed">
            Establish a direct line for professional inquiries, technical collaborations, or engineering roles. All transmissions are routed directly to my secure inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Form Dashboard */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 bg-[#111113] border border-white/10 p-8 shadow-2xl flex flex-col relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 via-gray-400 to-gray-800 opacity-20"></div>
            
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name..."
                    className="w-full bg-[#09090b] border border-white/10 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Email</label>
                  <input 
                    type="email" 
                    placeholder="name@company.com"
                    className="w-full bg-[#09090b] border border-white/10 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-white/30 font-mono transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Subject</label>
                <input 
                  type="text" 
                  placeholder="e.g. Engineering Role, Technical Collaboration..."
                  className="w-full bg-[#09090b] border border-white/10 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Message</label>
                <textarea 
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full bg-[#09090b] border border-white/10 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-white/30 resize-none transition-colors"
                ></textarea>
              </div>

              <button className="mt-4 w-full flex items-center justify-center gap-2 py-4 bg-white text-black font-bold text-xs tracking-widest uppercase hover:bg-gray-200 transition-colors">
                <Send size={16} /> Send Message
              </button>
            </form>
          </motion.div>

          {/* Communication Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 flex flex-col gap-3"
          >
            <a href="https://github.com/AbhirupBhowmick" target="_blank" rel="noopener noreferrer" className="p-5 bg-[#111113] border border-white/5 hover:border-white/20 hover:bg-white/[0.02] flex items-center justify-between group transition-all">
              <div className="flex items-center gap-4">
                <GithubIcon className="text-gray-400 group-hover:text-white transition-colors" size={20} />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-1">GITHUB</h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">ACTIVE</p>
                </div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-500 transition-colors shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            </a>

            <a href="https://www.linkedin.com/in/abhirup111" target="_blank" rel="noopener noreferrer" className="p-5 bg-[#111113] border border-white/5 hover:border-white/20 hover:bg-white/[0.02] flex items-center justify-between group transition-all">
              <div className="flex items-center gap-4">
                <LinkedinIcon className="text-gray-400 group-hover:text-white transition-colors" size={20} />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-1">LINKEDIN</h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">AVAILABLE</p>
                </div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-500 transition-colors shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            </a>

            <a href="mailto:abhirupbhowmick111777@gmail.com" className="p-5 bg-[#111113] border border-white/5 hover:border-white/20 hover:bg-white/[0.02] flex items-center justify-between group transition-all">
              <div className="flex items-center gap-4">
                <Mail className="text-gray-400 group-hover:text-white transition-colors" size={20} />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-1">EMAIL</h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">SECURE CHANNEL</p>
                </div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            </a>

            <a href="https://wa.me/919330789221" target="_blank" rel="noopener noreferrer" className="p-5 bg-[#111113] border border-white/5 hover:border-white/20 hover:bg-white/[0.02] flex items-center justify-between group transition-all">
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
              <div className="p-4 border border-white/5 bg-[#111113] text-[10px] text-gray-600 font-mono flex items-center justify-between">
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
