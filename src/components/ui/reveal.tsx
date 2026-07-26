"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger index — multiplied by 0.07s. Use for items in a grid. */
  index?: number;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header";
};

/**
 * Fade-up on scroll. Animates once, respects `prefers-reduced-motion`
 * (content still appears — only the movement is dropped).
 */
export function Reveal({ children, className, index = 0, delay = 0, as = "div" }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.55,
        delay: reduceMotion ? 0 : delay + index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
