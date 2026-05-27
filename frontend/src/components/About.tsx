"use client";
 
import { motion } from "framer-motion";
import { Briefcase, Trophy, Code2, FileDown, Mail } from "lucide-react";

const GithubIcon = ({ size = 12 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

const LinkedinIcon = ({ size = 12 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export default function About() {
  return (
    <section id="about" className="py-24 relative border-t border-white/5 bg-[#09090b]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-start gap-8 lg:gap-12 mb-20">
          <div className="relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0 rounded-full overflow-hidden border border-white/10 grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.03)]">
            <img 
              src="/4bcc7498-30ac-4dd6-a884-8c17c6517e85.JPG" 
              alt="Abhirup Bhowmick" 
              className="w-full h-full object-cover object-center scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/40 via-transparent to-transparent pointer-events-none"></div>
          </div>
          <div className="max-w-2xl">
            <h2 className="text-xs font-mono tracking-[0.2em] text-gray-500 uppercase mb-3">
              // Professional Identity
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light mb-6">
              AI systems engineer focused on scalable backend architecture, intelligent interfaces, and production-grade engineering experiences.
            </p>
            
            {/* Compact Action Row */}
            <div className="flex flex-wrap gap-3 items-center">
              <a 
                href="/resume/abhirup_bhowmick_cv.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] border border-white/5 hover:border-white/20 text-xs font-mono tracking-widest text-gray-400 hover:text-white uppercase transition-all duration-300 rounded-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.02)]"
              >
                <FileDown size={12} />
                Resume
              </a>
              
              <a 
                href="https://github.com/AbhirupBhowmick" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] border border-white/5 hover:border-white/20 text-xs font-mono tracking-widest text-gray-400 hover:text-white uppercase transition-all duration-300 rounded-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.02)]"
              >
                <GithubIcon size={12} />
                GitHub
              </a>

              <a 
                href="https://www.linkedin.com/in/abhirup111" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] border border-white/5 hover:border-white/20 text-xs font-mono tracking-widest text-gray-400 hover:text-white uppercase transition-all duration-300 rounded-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.02)]"
              >
                <LinkedinIcon size={12} />
                LinkedIn
              </a>

              <a 
                href="mailto:abhirupbhowmick111777@gmail.com"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] border border-white/5 hover:border-white/20 text-xs font-mono tracking-widest text-gray-400 hover:text-white uppercase transition-all duration-300 rounded-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.02)]"
              >
                <Mail size={12} />
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Experience Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="p-8 border border-white/10 bg-white/[0.02] flex flex-col justify-between group hover:bg-white/[0.04] transition-colors"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Briefcase size={18} className="text-gray-400" />
                <h3 className="text-sm font-semibold tracking-widest uppercase text-white">Experience</h3>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Technical Engineering Associate</h4>
              <p className="text-sm text-gray-400 mb-4">IDEAS-TIH, Indian Statistical Institute (ISI) Kolkata</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Engineered scalable backend services and analytics pipelines for enterprise AI/ML research systems. Optimized SQL schemas and data workflows, and implemented production-grade testing.
              </p>
            </div>
          </motion.div>

          {/* Experience Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 border border-white/10 bg-white/[0.02] flex flex-col justify-between group hover:bg-white/[0.04] transition-colors"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Code2 size={18} className="text-gray-400" />
                <h3 className="text-sm font-semibold tracking-widest uppercase text-white">Experience</h3>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Software Development Intern</h4>
              <p className="text-sm text-gray-400 mb-4">Gameonix</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Built responsive frontend systems integrated with scalable backend services within Agile engineering cycles. Improved application reliability and resolved critical performance bottlenecks.
              </p>
            </div>
          </motion.div>

          {/* Achievement Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 border border-white/10 bg-white/[0.02] flex flex-col justify-between group hover:bg-white/[0.04] transition-colors"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Trophy size={18} className="text-gray-400" />
                <h3 className="text-sm font-semibold tracking-widest uppercase text-white">Achievement</h3>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">TCS CodeVita Season 13</h4>
              <p className="text-sm text-gray-400 mb-4">Global Programming Competition</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-xs font-semibold tracking-widest uppercase text-white">
                Global Rank 2637
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mt-6">
                Demonstrated strong problem-solving skills and algorithmic thinking in one of the world's largest competitive programming challenges.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
