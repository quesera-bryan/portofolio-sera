"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  rotate?: number;
  className?: string;
}

export default function FloatingElement({ children, delay = 0, duration = 4, y = 10, rotate = 0, className = '' }: Props) {
  return (
    <motion.div
      animate={{
        y: [-y, y, -y],
        rotate: [-rotate, rotate, -rotate],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
