"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function HeroReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.2, 1, 1, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
