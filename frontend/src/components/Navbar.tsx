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
      if (isManualScrolling.current) return;

      const currentScrollY = window.scrollY;
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
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 h-20 px-8 lg:px-12 bg-black/30 backdrop-blur-md border-b border-white/5 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.02)] flex items-center pointer-events-auto"
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
        
        <div className="flex items-center gap-6">
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
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden md:flex text-xs tracking-widest uppercase font-semibold border border-white/10 text-gray-300 backdrop-blur-md bg-white/[0.02] hover:bg-white/[0.05] hover:text-white hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.05),inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-sm px-6 h-10 transition-all"
            >
              CONNECT
            </Button>
          </MagneticButton>
        </div>
      </div>
    </motion.header>
  );
}
