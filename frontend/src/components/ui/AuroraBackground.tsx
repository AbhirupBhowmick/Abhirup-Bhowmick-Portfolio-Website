"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Aurora from "./Aurora";

export default function AuroraBackground() {
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25],
    [1, 0.12]
  );
  
  const blur = useTransform(
    scrollYProgress,
    [0, 0.25],
    ["blur(20px)", "blur(0px)"]
  );

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none -z-30"
      style={{ opacity, filter: blur }}
    >
      <Aurora 
        colorStops={["#0B1020", "#1A1F35", "#1D103F"]}
        speed={0.55}
        blend={0.42}
        amplitude={0.8}
      />
    </motion.div>
  );
}
