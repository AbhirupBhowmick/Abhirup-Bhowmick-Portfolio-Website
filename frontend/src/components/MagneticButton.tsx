"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: any) => void;
  href?: string;
  target?: string;
  rel?: string;
  variant?: "primary" | "outline" | "ghost";
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    setPosition({ x: x * 0.2, y: y * 0.2 }); // Reduced magnetic force for subtlety
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 } });
  };

  useEffect(() => {
    controls.start({ x: position.x, y: position.y, transition: { type: "tween", ease: "linear", duration: 0 } });
  }, [position, controls]);

  const innerContent = (
    <motion.div
      ref={ref}
      animate={controls}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="inline-block" onClick={onClick}>
        {innerContent}
      </a>
    );
  }

  return innerContent;
}
