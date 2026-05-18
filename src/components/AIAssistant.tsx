import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
};

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{role: 'ai' | 'user', content: string}>>([]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const togglePanel = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{ role: 'ai', content: "Hello! I am your Neural Sync AI Assistant. How can I help you explore this portfolio today?" }]);
      }, 500);
    }
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    
    // Play subtle sound (optional, mimicking real behavior)
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA'); // tiny beep placeholder
      audio.volume = 0.1;
      audio.play().catch(() => {});
    } catch(err) {}

    const newMsg = inputValue;
    setMessages(prev => [...prev, { role: 'user', content: newMsg }]);
    setInputValue('');

    // Simulate AI reply
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: "I'm currently running in demo mode, but I can certainly help you navigate the Architecture Lab or show you the best projects!" }]);
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickActions = ['Show my best project', 'Download Resume', 'Explain Architecture'];

  return (
    <>
      {/* Floating Orb Trigger */}
      <button 
        onClick={togglePanel}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 shadow-[0_0_30px_rgba(0,255,204,0.6)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group"
        aria-label="Toggle AI Assistant"
      >
        <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-[spin_4s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite]" />
        <div className="absolute inset-2 rounded-full border border-white/10 animate-[spin_3s_linear_infinite_reverse]" />
        <svg className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>

      {/* Chat Panel Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-40 w-full md:w-[450px] h-full h-screen bg-gray-950/80 backdrop-blur-2xl border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#00ffcc] to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,204,0.4)]">
                  <div className="absolute inset-0 rounded-full border border-white/30 animate-pulse" />
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Neural Sync AI</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse" />
                    <span className="text-xs text-[#00ffcc]">System Online</span>
                  </div>
                </div>
              </div>
              <button onClick={togglePanel} className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-tr-sm' 
                      : 'bg-white/10 text-gray-200 border border-white/5 rounded-tl-sm shadow-[0_4px_15px_rgba(0,0,0,0.1)]'
                  }`}>
                    {msg.role === 'ai' ? <TypewriterText text={msg.content} /> : msg.content}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length > 0 && (
              <div className="px-6 pb-2 flex flex-wrap gap-2">
                {quickActions.map((action, i) => (
                  <motion.button
                    key={action}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    onClick={() => {
                      setInputValue(action);
                      setTimeout(() => handleSend(), 100);
                    }}
                    className="text-xs px-3 py-2 rounded-full bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/30 hover:bg-[#00ffcc]/20 transition-colors"
                  >
                    {action}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-6 pt-4 border-t border-white/10 bg-white/[0.02]">
              <form onSubmit={handleSend} className="relative">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Initialize command sequence..."
                  className="w-full bg-black/40 border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffcc]/50 focus:shadow-[0_0_15px_rgba(0,255,204,0.2)] transition-all"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#00ffcc] text-gray-900 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-300 transition-colors"
                >
                  <svg className="w-4 h-4 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
            
            {/* Custom scrollbar styles can go into global CSS, inline for demonstration */}
            <style>{`
              .custom-scrollbar::-webkit-scrollbar { width: 6px; }
              .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
              .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
