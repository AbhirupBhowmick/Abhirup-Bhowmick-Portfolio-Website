"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, Folder, FileText, Send, Terminal, LayoutTemplate } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    // Add small delay for animation to finish
    setTimeout(command, 150);
  };

  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el);
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl backdrop-blur-md bg-black/40 border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.02)] rounded-xl overflow-hidden"
          >
            <Command className="w-full h-full flex flex-col cmdk-root">
              <div className="flex items-center border-b border-white/5 px-4 h-14">
                <Search className="w-5 h-5 text-gray-500 mr-3" />
                <Command.Input 
                  placeholder="Type a command or search..." 
                  className="flex-1 bg-transparent text-white placeholder:text-gray-500 focus:outline-none text-sm"
                  autoFocus
                />
                <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono tracking-widest bg-white/5 px-2 py-1 rounded-sm">
                  <span className="text-xs font-sans">ESC</span> TO CANCEL
                </div>
              </div>

              <Command.List className="max-h-[300px] overflow-y-auto p-2 cmdk-list custom-scrollbar">
                <Command.Empty className="py-6 text-center text-sm text-gray-500">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="text-xs text-gray-500 font-semibold tracking-widest px-2 py-2">
                  <Command.Item 
                    onSelect={() => runCommand(() => smoothScrollTo("projects"))}
                    className="flex items-center px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                  >
                    <Folder className="w-4 h-4 mr-3 text-gray-400" />
                    Go to Projects
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => smoothScrollTo("lab"))}
                    className="flex items-center px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                  >
                    <LayoutTemplate className="w-4 h-4 mr-3 text-gray-400" />
                    View Architecture Lab
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => smoothScrollTo("contact"))}
                    className="flex items-center px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                  >
                    <Send className="w-4 h-4 mr-3 text-gray-400" />
                    Contact Me
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Actions" className="text-xs text-gray-500 font-semibold tracking-widest px-2 py-2 mt-2">
                  <Command.Item 
                    onSelect={() => runCommand(() => {
                      window.open("/resume/abhirup_bhowmick_cv.pdf", "_blank");
                    })}
                    className="flex items-center px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                  >
                    <FileText className="w-4 h-4 mr-3 text-emerald-500" />
                    Open Resume
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => {
                      const input = document.getElementById("ai-terminal-input");
                      smoothScrollTo("ai-assistant");
                      setTimeout(() => input?.focus(), 800);
                    })}
                    className="flex items-center px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                  >
                    <Terminal className="w-4 h-4 mr-3 text-blue-500" />
                    Talk To AI
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Links" className="text-xs text-gray-500 font-semibold tracking-widest px-2 py-2 mt-2">
                  <Command.Item 
                    onSelect={() => runCommand(() => window.open("https://github.com/AbhirupBhowmick", "_blank"))}
                    className="flex items-center px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                  >
                    <svg className="w-4 h-4 mr-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                    Open GitHub
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => window.open("https://www.linkedin.com/in/abhirup111", "_blank"))}
                    className="flex items-center px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
                  >
                    <svg className="w-4 h-4 mr-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    Open LinkedIn
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
