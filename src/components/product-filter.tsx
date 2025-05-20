"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function ProductFilter() {
  const [priceRange, setPriceRange] = useState([0, 500])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [activeAccordions, setActiveAccordions] = useState<string[]>(["categories", "price"])
  const prefersReducedMotion = useReducedMotion()

  const toggleAccordion = (id: string) => {
    setActiveAccordions((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div className="border-b pb-4">
        <button
          className="flex w-full justify-between items-center py-2 font-medium"
          onClick={() => toggleAccordion("categories")}
        >
          Categories
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform ${activeAccordions.includes("categories") ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <AnimatePresence>
          {activeAccordions.includes("categories") && (
            <motion.div
              initial={prefersReducedMotion ? { height: "auto" } : { height: 0, opacity: 0 }}
              animate={prefersReducedMotion ? { height: "auto" } : { height: "auto", opacity: 1 }}
              exit={prefersReducedMotion ? { height: "auto" } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="electronics" className="rounded border-gray-300" />
                  <label htmlFor="electronics" className="text-sm">
                    Electronics
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="fitness" className="rounded border-gray-300" />
                  <label htmlFor="fitness" className="text-sm">
                    Fitness
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="smart-home" className="rounded border-gray-300" />
                  <label htmlFor="smart-home" className="text-sm">
                    Smart Home
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="accessories" className="rounded border-gray-300" />
                  <label htmlFor="accessories" className="text-sm">
                    Accessories
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="digital-products" className="rounded border-gray-300" />
                  <label htmlFor="digital-products" className="text-sm">
                    Digital Products
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Range */}
      <div className="border-b pb-4">
        <button
          className="flex w-full justify-between items-center py-2 font-medium"
          onClick={() => toggleAccordion("price")}
        >
          Price Range
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform ${activeAccordions.includes("price") ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <AnimatePresence>
          {activeAccordions.includes("price") && (
            <motion.div
              initial={prefersReducedMotion ? { height: "auto" } : { height: 0, opacity: 0 }}
              animate={prefersReducedMotion ? { height: "auto" } : { height: "auto", opacity: 1 }}
              exit={prefersReducedMotion ? { height: "auto" } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-2">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#663399] rounded-full"
                    style={{
                      width: `${(priceRange[1] - priceRange[0]) / 10}%`,
                      marginLeft: `${priceRange[0] / 10}%`,
                    }}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Brands */}
      <div className="border-b pb-4">
        <button
          className="flex w-full justify-between items-center py-2 font-medium"
          onClick={() => toggleAccordion("brands")}
        >
          Brands
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform ${activeAccordions.includes("brands") ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <AnimatePresence>
          {activeAccordions.includes("brands") && (
            <motion.div
              initial={prefersReducedMotion ? { height: "auto" } : { height: 0, opacity: 0 }}
              animate={prefersReducedMotion ? { height: "auto" } : { height: "auto", opacity: 1 }}
              exit={prefersReducedMotion ? { height: "auto" } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="brand1" className="rounded border-gray-300" />
                  <label htmlFor="brand1" className="text-sm">
                    Brand One
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="brand2" className="rounded border-gray-300" />
                  <label htmlFor="brand2" className="text-sm">
                    Brand Two
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="brand3" className="rounded border-gray-300" />
                  <label htmlFor="brand3" className="text-sm">
                    Brand Three
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="brand4" className="rounded border-gray-300" />
                  <label htmlFor="brand4" className="text-sm">
                    Brand Four
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Type */}
      <div className="border-b pb-4">
        <button
          className="flex w-full justify-between items-center py-2 font-medium"
          onClick={() => toggleAccordion("type")}
        >
          Product Type
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform ${activeAccordions.includes("type") ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <AnimatePresence>
          {activeAccordions.includes("type") && (
            <motion.div
              initial={prefersReducedMotion ? { height: "auto" } : { height: 0, opacity: 0 }}
              animate={prefersReducedMotion ? { height: "auto" } : { height: "auto", opacity: 1 }}
              exit={prefersReducedMotion ? { height: "auto" } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="physical" className="rounded border-gray-300" />
                  <label htmlFor="physical" className="text-sm">
                    Physical Products
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="digital" className="rounded border-gray-300" />
                  <label htmlFor="digital" className="text-sm">
                    Digital Downloads
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pt-4">
        <motion.button
          className="w-full bg-[#663399] hover:bg-[#563289] text-white py-2 px-4 rounded transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Apply Filters
        </motion.button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop filter */}
      <div className="hidden md:block">
        <h3 className="text-lg font-medium mb-4">Filters</h3>
        <FilterContent />
      </div>

      {/* Mobile filter */}
      <div className="md:hidden">
        <motion.button
          onClick={() => setMobileFiltersOpen(true)}
          className="w-full border border-gray-300 py-2 px-4 rounded flex items-center justify-between"
          whileHover={{ backgroundColor: "#f9fafb" }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>

        <AnimatePresence>
          {mobileFiltersOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileFiltersOpen(false)}
              />
              <motion.div
                className="fixed inset-y-0 right-0 max-w-full w-full sm:max-w-md bg-white shadow-xl z-50 flex flex-col"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button onClick={() => setMobileFiltersOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <FilterContent />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
