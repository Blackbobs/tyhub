"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  delay?: number
  staggerChildren?: number
}

export default function StaggerContainer({
  children,
  className = "",
  delay = 0,
  staggerChildren = 0.1,
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  }

  // If user prefers reduced motion, just show the content without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} variants={variants} initial="hidden" animate="show" exit="hidden">
      {children}
    </motion.div>
  )
}
