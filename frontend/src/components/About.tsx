"use client";

import { motion } from "framer-motion";
import { Briefcase, Trophy, Code2 } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 relative border-t border-white/5 bg-[#09090b]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-16">
          <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
            <img 
              src="/portrait.png" 
              alt="Abhirup Bhowmick" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-3">
              // Professional Identity
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
              AI systems engineer focused on scalable backend architecture, intelligent interfaces, and production-grade engineering experiences.
            </p>
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
