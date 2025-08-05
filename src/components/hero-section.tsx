"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative bg-gray-50 py-16 md:py-24 lg:py-32 md:px-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6 text-center md:text-left">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717]"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Discover Premium Products for Your Lifestyle
            </motion.h1>
            <motion.p
              className="text-lg text-gray-500 max-w-[600px] mx-auto md:mx-0"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Shop our curated collection of high-quality products designed to enhance your everyday life.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/products">
                <motion.button
                  className="bg-[#663399] hover:bg-[#563289] text-white py-3 px-8 font-bold rounded w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Now
                </motion.button>
              </Link>
              {/* <Link href="#featured">
                <motion.button
                  className="border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Featured
                </motion.button>
              </Link> */}
            </motion.div>
          </div>
          <motion.div
            className="relative aspect-[4/3] md:aspect-square rounded-lg overflow-hidden"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="absolute flex items-center justify-center">
              <motion.img
                src="/gym.jpg"
                alt="Featured product"
                className="object-cover w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
