import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

const MagneticIcon = ({ children, href }: { children: React.ReactNode, href: string }) => {
  const iconRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = icon.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(icon, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(icon, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    };

    icon.addEventListener("mousemove", handleMouseMove);
    icon.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      icon.removeEventListener("mousemove", handleMouseMove);
      icon.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a 
      ref={iconRef} 
      href={href} 
      className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white inline-flex items-center justify-center"
    >
      {children}
    </a>
  );
};

export const ContactPortal = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Confetti Explosion
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#00ffcc', '#0088ff', '#ffffff']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#00ffcc', '#0088ff', '#ffffff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
      
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col font-sans text-white overflow-hidden">
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-24 relative z-10">
        
        <div className="max-w-xl w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-[#00ffcc]">Uplink</span>
            </h1>
            <p className="text-gray-400 text-lg">Establish a secure connection. Open for collaborations.</p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit} 
            className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl relative"
          >
            <div className="space-y-8">
              {/* Input Group */}
              <div className="relative group">
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-none outline-none text-white pb-3 peer placeholder-transparent"
                  placeholder="Name"
                />
                <label className="absolute left-0 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-0 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-[#00ffcc] pointer-events-none -translate-y-6 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-0">
                  Identification (Name)
                </label>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00ffcc] to-blue-500 transition-all duration-500 peer-focus:w-full shadow-[0_0_10px_rgba(0,255,204,0.5)]" />
              </div>

              {/* Input Group */}
              <div className="relative group">
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-none outline-none text-white pb-3 peer placeholder-transparent"
                  placeholder="Email"
                />
                <label className="absolute left-0 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-0 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-[#00ffcc] pointer-events-none -translate-y-6 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-0">
                  Comm Link (Email)
                </label>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00ffcc] to-blue-500 transition-all duration-500 peer-focus:w-full shadow-[0_0_10px_rgba(0,255,204,0.5)]" />
              </div>

              {/* Input Group */}
              <div className="relative group">
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-none outline-none text-white pb-3 peer placeholder-transparent resize-none"
                  placeholder="Message"
                />
                <label className="absolute left-0 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-0 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-[#00ffcc] pointer-events-none -translate-y-6 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-0">
                  Transmitted Data
                </label>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00ffcc] to-blue-500 transition-all duration-500 peer-focus:w-full shadow-[0_0_10px_rgba(0,255,204,0.5)]" />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold relative overflow-hidden group hover:bg-white/10 transition-all disabled:opacity-50"
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Transmitting...' : isSuccess ? 'Uplink Successful' : 'Initiate Transmission'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00ffcc]/20 to-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>
            </div>
          </motion.form>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-auto pt-10 border-t border-white/5">
        {/* Soft Glowing Top Border */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc]/50 to-transparent shadow-[0_0_20px_rgba(0,255,204,0.8)]" />

        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 pb-10">
          <div className="flex items-center gap-4">
            <MagneticIcon href="https://github.com/AbhirupBhowmick">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </MagneticIcon>
            <MagneticIcon href="#">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </MagneticIcon>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Abhirup Bhowmick. All systems operational.
          </div>
        </div>

        {/* Infinite Scroll Marquee */}
        <div className="w-full bg-[#00ffcc]/5 py-3 border-t border-y-[#00ffcc]/10 overflow-hidden relative">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="whitespace-nowrap flex gap-10"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mix-blend-plus-lighter">
                • BUILDING THE FUTURE OF THE WEB • ARCHITECTURE LAB • NEURAL SYNC ACTIVE 
              </span>
            ))}
          </motion.div>
        </div>
      </footer>
    </div>
  );
};
