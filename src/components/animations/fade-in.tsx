"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  duration?: number
  once?: boolean
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 20,
  duration = 0.5,
  once = true,
}: FadeInProps) {
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
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  }

  // If user prefers reduced motion, just show the content without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={variants}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
