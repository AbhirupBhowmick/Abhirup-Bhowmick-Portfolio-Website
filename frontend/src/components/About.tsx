"use client";

import { motion } from "framer-motion";
import { Briefcase, Trophy, Code2 } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 relative border-t border-white/5 bg-[#09090b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="max-w-3xl mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">
            // Professional Identity
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
            I am an engineer focused on building robust, scalable systems and modern AI integrations. 
            My background spans full-stack product development and high-performance backend architecture.
          </p>
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
