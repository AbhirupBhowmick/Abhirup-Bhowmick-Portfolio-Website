"use client";

import { motion } from "framer-motion";

const timelineItems = [
  {
    year: "2022 - 2026",
    title: "B.Tech in Computer Science Engineering (AI-ML)",
    organization: "Brainware University",
    details: [
      "Focused on Artificial Intelligence, Machine Learning, distributed systems, and modern software engineering.",
      "Built strong foundations in data structures, algorithms, backend systems, databases, and system design.",
      "Worked extensively on full-stack engineering and AI-integrated application development."
    ]
  },
  {
    year: "AUG 2025 - SEP 2025",
    title: "Technical Engineering Associate",
    organization: "IDEAS-TIH, Indian Statistical Institute (ISI) Kolkata",
    details: [
      "Engineered scalable backend services and analytics pipelines for enterprise AI/ML research systems.",
      "Optimized SQL schemas, data workflows, and validation pipelines for improved reliability.",
      "Contributed to production-grade engineering practices including testing, architecture refinement, and workflow optimization."
    ]
  },
  {
    year: "JUL 2025 - DEC 2025",
    title: "Software Development Intern",
    organization: "Gameonix",
    details: [
      "Developed responsive frontend systems integrated with scalable backend services.",
      "Worked within Agile engineering environments to improve application reliability and maintainability.",
      "Resolved critical performance bottlenecks and improved production workflow efficiency."
    ]
  },
  {
    year: "2025 - 2026",
    title: "Global Rank 2637",
    organization: "TCS CodeVita Season 13",
    details: [
      "Achieved a strong global ranking in one of the world's largest competitive programming competitions.",
      "Demonstrated advanced problem-solving ability, algorithmic thinking, and coding efficiency under competitive constraints."
    ]
  }
];

export default function ExperienceTimeline() {
  return (
    <section id="timeline" className="py-24 relative border-t border-white/5 bg-[#09090b]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="mb-20 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Experience Timeline
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            A trajectory of technical engineering, academic foundation, and global achievements.
          </p>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-16">
          {timelineItems.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute w-2 h-2 bg-gray-500 rounded-full -left-[4.5px] top-1.5 ring-4 ring-[#09090b]"></div>
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-4">
                <span className="text-xs font-mono font-semibold tracking-widest text-gray-400 uppercase min-w-[140px]">
                  {item.year}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                  <h4 className="text-sm font-semibold tracking-widest text-gray-500 uppercase">{item.organization}</h4>
                </div>
              </div>

              <div className="md:pl-[172px]">
                <ul className="space-y-3">
                  {item.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-400 leading-relaxed flex items-start gap-3">
                      <span className="text-gray-600 mt-1.5 text-[10px]">■</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
