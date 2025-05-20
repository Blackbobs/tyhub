"use client"

import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export default function ToastContainer() {
  const { toasts } = useToast()
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-0 right-0 p-4 z-50 flex flex-col gap-2 max-w-md w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className={`rounded-lg shadow-lg p-4 ${
              toast.variant === "success"
                ? "bg-green-50 border-l-4 border-green-500"
                : toast.variant === "error"
                  ? "bg-red-50 border-l-4 border-red-500"
                  : toast.variant === "warning"
                    ? "bg-yellow-50 border-l-4 border-yellow-500"
                    : "bg-blue-50 border-l-4 border-blue-500"
            }`}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }
            }
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {toast.variant === "success" ? (
                  <motion.svg
                    className="h-5 w-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 15, -15, 0] }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                ) : toast.variant === "error" ? (
                  <motion.svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 15, -15, 0] }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                ) : toast.variant === "warning" ? (
                  <motion.svg
                    className="h-5 w-5 text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 15, -15, 0] }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                ) : (
                  <motion.svg
                    className="h-5 w-5 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 15, -15, 0] }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                )}
              </div>
              <div className="ml-3 w-0 flex-1">
                <motion.p
                  className={`text-sm font-medium ${
                    toast.variant === "success"
                      ? "text-green-800"
                      : toast.variant === "error"
                        ? "text-red-800"
                        : toast.variant === "warning"
                          ? "text-yellow-800"
                          : "text-blue-800"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {toast.title}
                </motion.p>
                {toast.description && (
                  <motion.p
                    className="mt-1 text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {toast.description}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
