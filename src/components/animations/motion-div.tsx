"use client"

import {
  motion,
  type Variants,
  type TargetAndTransition,
  type VariantLabels,
  type AnimationControls
} from "framer-motion"
import type { ReactNode } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface MotionDivProps {
  children: ReactNode
  className?: string
  initial?: boolean | TargetAndTransition | VariantLabels
  animate?: boolean | TargetAndTransition | VariantLabels | AnimationControls
  exit?: TargetAndTransition | VariantLabels
  transition?: object
  whileHover?: TargetAndTransition | VariantLabels
  whileTap?: TargetAndTransition | VariantLabels
  variants?: Variants
  layout?:  boolean | "position" | "size" | "preserve-aspect" | undefined;
  layoutId?: string
  onClick?: () => void
}

export default function MotionDiv({
  children,
  className,
  initial,
  animate,
  exit,
  transition,
  whileHover,
  whileTap,
  variants,
  layout,
  layoutId,
  onClick,
}: MotionDivProps) {
  const prefersReducedMotion = useReducedMotion()

  const safeTransition = prefersReducedMotion
    ? { duration: 0 }
    : transition || { type: "spring", stiffness: 300, damping: 30 }

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? undefined : initial}
      animate={prefersReducedMotion ? undefined : animate}
      exit={prefersReducedMotion ? undefined : exit}
      transition={safeTransition}
      whileHover={prefersReducedMotion ? undefined : whileHover}
      whileTap={prefersReducedMotion ? undefined : whileTap}
      variants={prefersReducedMotion ? undefined : variants}
      layout={layout}
      layoutId={layoutId}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
