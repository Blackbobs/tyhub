"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export default function Newsletter() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <motion.h2
            className="text-3xl font-bold tracking-tight md:text-4xl"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Subscribe to Our Newsletter
          </motion.h2>
          <motion.p
            className="text-gray-500"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Stay updated with our latest products, exclusive offers, and promotions.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#663399] focus:border-transparent"
            />
            <motion.button
              className="bg-[#663399] hover:bg-[#563289] text-white py-2 px-4 rounded w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
