"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface StaggerItemProps {
  children: ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
}

export default function StaggerItem({ children, className = "", direction = "up", distance = 20 }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion()

  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance }
      case "down":
        return { y: -distance }
      case "left":
        return { x: distance }
      case "right":
        return { x: -distance }
      default:
        return {}
    }
  }

  const variants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset(),
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  // If user prefers reduced motion, just show the content without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}
