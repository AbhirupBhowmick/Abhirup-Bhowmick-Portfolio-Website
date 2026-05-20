"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";
import MagneticButton from "./MagneticButton";

const GithubIcon = ({ className, size = 18 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

const LinkedinIcon = ({ className, size = 18 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const navItems = [
  { name: "PROJECTS", id: "projects" },
  { name: "STACK", id: "stack" },
  { name: "LAB", id: "lab" },
  { name: "TIMELINE", id: "timeline" },
  { name: "CONTACT", id: "contact" }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const isManualScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0, scaleX: 1 });
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);


  useEffect(() => {
    const activeIndex = navItems.findIndex(item => item.id === activeSection);
    if (activeIndex !== -1 && navRefs.current[activeIndex]) {
      const el = navRefs.current[activeIndex];
      setIndicatorStyle({
        left: el?.offsetLeft || 0,
        width: el?.offsetWidth || 0,
        opacity: 1,
        scaleX: 1
      });
    } else {
      setIndicatorStyle(prev => ({ 
        ...prev, 
        opacity: 0,
        scaleX: 0.8
      }));
    }
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (isManualScrolling.current) return;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime.current;
      const scrollDiff = currentScrollY - lastScrollY.current;
      const velocity = timeDiff > 0 ? Math.abs(scrollDiff / timeDiff) : 0;
      
      lastScrollY.current = currentScrollY;
      lastScrollTime.current = currentTime;

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = currentScrollY + 120; // Account for navbar height + offset

      let currentActive = "";
      sections.forEach((section) => {
        if (section && section.offsetTop <= scrollPosition) {
          currentActive = section.id;
        }
      });

      // Explicitly clear hero section
      if (currentScrollY < 100) {
        currentActive = "";
      }

      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

      if (velocity > 1.5) {
        // High velocity: debounce the active section update to skip intermediate items
        debounceTimeout.current = setTimeout(() => {
          setActiveSection(currentActive);
        }, 150);
      } else {
        // Normal velocity: update immediately
        setActiveSection(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    setActiveSection(id);
    isManualScrolling.current = true;
    
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    
    const el = document.getElementById(id);
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el);
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // Lock scrollspy for 1300ms to allow Lenis (1200ms) to complete animation
    scrollTimeout.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 1300);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 h-20 px-8 lg:px-12 transition-all duration-300 flex items-center pointer-events-auto ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4),inset_0_-1px_0_0_rgba(255,255,255,0.02)]' : 'bg-black/30 backdrop-blur-md border-b border-white/5 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.02)]'}`}
      >
        <div className="max-w-[1400px] w-full mx-auto flex items-center justify-between">
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection("");
              isManualScrolling.current = true;
              if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
              if ((window as any).lenis) {
                (window as any).lenis.scrollTo(0);
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              scrollTimeout.current = setTimeout(() => {
                isManualScrolling.current = false;
              }, 1300);
            }} 
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-bold tracking-widest text-white/90 group-hover:text-white transition-colors duration-300 text-sm md:text-base">
              ABHIRUP BHOWMICK
            </span>
          </a>
          
          <nav className="hidden md:flex items-center gap-10 lg:gap-14 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item, index) => (
              <Link 
                key={item.name} 
                ref={(el) => { navRefs.current[index] = el; }}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative py-2 text-xs font-semibold tracking-widest transition-colors duration-500 ease-out ${
                  activeSection === item.id ? "text-white" : "text-white/40 hover:text-white/80"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Active Indicator using explicit transform */}
            <div 
              className="absolute bottom-0 h-[1px] bg-white pointer-events-none transition-all duration-300"
              style={{
                width: indicatorStyle.width,
                transform: `translateX(${indicatorStyle.left}px) scaleX(${indicatorStyle.scaleX})`,
                opacity: indicatorStyle.opacity,
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            />
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-5 mr-2">
              <a href="https://github.com/AbhirupBhowmick" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300">
                <GithubIcon size={18} />
              </a>
              <a href="https://www.linkedin.com/in/abhirup111" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300">
                <LinkedinIcon size={18} />
              </a>
            </div>
            <MagneticButton>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector('#contact');
                  if (el) {
                    if ((window as any).lenis) {
                      (window as any).lenis.scrollTo(el);
                    } else {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="hidden md:flex text-xs tracking-widest uppercase font-semibold border border-white/10 text-gray-300 backdrop-blur-md bg-white/[0.02] hover:bg-white/[0.05] hover:text-white hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.05),inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-sm px-6 h-10 transition-all"
              >
                CONNECT
              </Button>
            </MagneticButton>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col items-end justify-center w-10 h-10 gap-1.5 focus:outline-none z-50 relative cursor-pointer"
              aria-label="Toggle Menu"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 4.5, width: "20px" } : { rotate: 0, y: 0, width: "20px" }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-[1px] bg-white/90"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-4 h-[1px] bg-white/90 origin-right"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -4.5, width: "20px" } : { rotate: 0, y: 0, width: "12px" }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-[1px] bg-white/90"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-black/98 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden w-screen h-screen"
          >
            {/* Dedicated Mobile Header inside Overlay */}
            <div className="absolute top-0 inset-x-0 h-20 px-8 flex items-center justify-between border-b border-white/5 bg-black/20">
              <span className="font-bold tracking-widest text-white/90 text-sm">
                ABHIRUP BHOWMICK
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="flex flex-col items-end justify-center w-10 h-10 gap-1.5 focus:outline-none cursor-pointer"
                aria-label="Close Menu"
              >
                <span className="w-5 h-[1px] bg-white rotate-45 translate-y-[2px]" />
                <span className="w-5 h-[1px] bg-white -rotate-45 -translate-y-[2px]" />
              </button>
            </div>

            {/* Dynamic background lighting for subtle atmospheric depth */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-[-1]">
              <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-indigo-500/10 via-slate-500/5 to-transparent blur-[120px]" />
            </div>

            <nav className="flex flex-col gap-6 text-left max-w-md mx-auto w-full mt-8">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={`#${item.id}`}
                      onClick={(e) => {
                        handleNavClick(e, item.id);
                        setIsOpen(false);
                      }}
                      className="relative py-2 text-2xl font-bold tracking-widest text-white/40 hover:text-white transition-all uppercase flex items-center gap-4 group"
                    >
                      {/* Active Indicator inside mobile menu */}
                      <span className={`w-1.5 h-1.5 rounded-full bg-white transition-transform duration-300 ${isActive ? 'scale-100' : 'scale-0'}`} />
                      <span className={`transition-all duration-300 ${isActive ? 'text-white translate-x-2' : 'hover:translate-x-1'}`}>
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-white/20 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        // 0{index + 1}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            
            {/* Mobile Footer/Utility Links inside Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-10 left-8 right-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/5 pt-6 max-w-md mx-auto w-[calc(100%-4rem)]"
            >
              <div className="flex gap-6">
                <a href="https://github.com/AbhirupBhowmick" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-300 text-xs font-semibold tracking-widest flex items-center gap-2">
                  <GithubIcon size={14} /> GITHUB
                </a>
                <a href="https://www.linkedin.com/in/abhirup111" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-300 text-xs font-semibold tracking-widest flex items-center gap-2">
                  <LinkedinIcon size={14} /> LINKEDIN
                </a>
                <a href="mailto:abhirupbhowmick111777@gmail.com" className="text-white/40 hover:text-white transition-colors duration-300 text-xs font-semibold tracking-widest flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> EMAIL
                </a>
              </div>
              <div className="text-[10px] font-mono text-white/20">
                SYS_ACTIVE // v2.0
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
