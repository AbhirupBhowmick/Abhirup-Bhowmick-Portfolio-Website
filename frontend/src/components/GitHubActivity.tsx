"use client";

import { motion } from "framer-motion";
import { GitBranch, Activity, Code, BookOpen } from "lucide-react";

const activityCategories = [
  { 
    title: "Recent Repositories", 
    description: "Active development on full-stack AI platforms and backend architecture.",
    icon: <BookOpen size={20} className="text-gray-400" />
  },
  { 
    title: "Contribution Activity", 
    description: "Consistent history of commits, code reviews, and merged pull requests.",
    icon: <Activity size={20} className="text-gray-400" />
  },
  { 
    title: "Languages Used", 
    description: "Java, TypeScript, Python, SQL, and system-level scripting.",
    icon: <Code size={20} className="text-gray-400" />
  },
  { 
    title: "Open Source", 
    description: "Engagement with open-source communities and infrastructure projects.",
    icon: <GitBranch size={20} className="text-gray-400" />
  }
];

export default function GitHubActivity() {
  return (
    <section id="github" className="py-24 relative border-t border-white/5 bg-[#09090b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              GitHub Sync
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              An overview of active engineering work, code quality, and continuous integration patterns. 
              (Live data connection pending).
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/10 rounded-full shrink-0">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Live Sync Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {activityCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 bg-[#111113] border border-white/5 hover:border-white/10 transition-colors flex flex-col group"
            >
              <div className="mb-6 w-10 h-10 rounded-lg bg-[#09090b] border border-white/5 flex items-center justify-center group-hover:border-white/20 transition-colors">
                {category.icon}
              </div>
              <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">
                {category.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {category.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
