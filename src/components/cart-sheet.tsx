"use client"

import { useEffect, useState, useRef } from "react"
import { useCartStore } from "@/lib/cart-store"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export default function CartSheet() {
  const [open, setOpen] = useState(false)
  const { items, totalItems, subtotal, isLoading, error, fetchCart, updateQuantity, removeFromCart, clearCart } =
    useCartStore()
  const { toast } = useToast()
  const prefersReducedMotion = useReducedMotion()
  const modalRef = useRef(null)

  // Fetch cart on initial load
  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    }
  }, [error, toast])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [open])

  const handleCheckout = async () => {
    window.location.href = "/api/shopify/checkout"
  }

  return (
    <div>
      {/* Cart Button with Badge Animation */}
      <motion.button
        onClick={() => setOpen(true)}
        className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
        aria-label="Open cart"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              className="absolute -top-2 -right-2 bg-[#663399] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              {totalItems}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Cart Modal with Animation */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black bg-opacity-50"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              ref={modalRef}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-lg flex flex-col"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { x: "100%" },
                visible: { x: 0 },
              }}
              transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Your Cart ({totalItems})</h2>
                <motion.button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close cart"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
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
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-4">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <motion.svg
                      className="h-8 w-8 text-[#663399]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </motion.svg>
                  </div>
                ) : items.length === 0 ? (
                  <motion.div
                    className="flex flex-col items-center justify-center h-full text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className="bg-gray-100 rounded-full p-6 mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </motion.div>
                    <h3 className="font-medium text-lg mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                    <motion.button
                      onClick={() => setOpen(false)}
                      className="bg-[#663399] hover:bg-[#563289] text-white py-2 px-4 rounded transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Continue Shopping
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="flex gap-4 border-b pb-4"
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        layout
                      >
                        <div className="h-20 w-20 rounded-md overflow-hidden bg-white flex-shrink-0">
                          <motion.img
                            src={item.image?.url || "/placeholder.svg?height=80&width=80"}
                            alt={item.image?.altText || item.title}
                            className="h-full w-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{item.productTitle}</h4>
                            <motion.button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-500 hover:text-red-500"
                              aria-label="Remove item"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </motion.button>
                          </div>
                          <div className="text-sm text-gray-500">{item.title}</div>
                          <div className="mt-auto flex justify-between items-center">
                            <div className="flex items-center border rounded-md">
                              <motion.button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                disabled={item.quantity <= 1 || isLoading}
                                className="px-2 py-1 border-r disabled:opacity-50"
                                aria-label="Decrease quantity"
                                whileHover={item.quantity > 1 && !isLoading ? { backgroundColor: "#f3f4f6" } : {}}
                                whileTap={item.quantity > 1 && !isLoading ? { scale: 0.95 } : {}}
                              >
                                -
                              </motion.button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <motion.button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={isLoading}
                                className="px-2 py-1 border-l disabled:opacity-50"
                                aria-label="Increase quantity"
                                whileHover={!isLoading ? { backgroundColor: "#f3f4f6" } : {}}
                                whileTap={!isLoading ? { scale: 0.95 } : {}}
                              >
                                +
                              </motion.button>
                            </div>
                            <div className="font-medium">
                              ${(Number.parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <motion.div
                  className="border-t p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <motion.span
                        className="font-medium"
                        key={subtotal}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        ${subtotal.toFixed(2)}
                      </motion.span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="border-t pt-2 mt-2"></div>
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <motion.span
                        key={subtotal}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        ${subtotal.toFixed(2)}
                      </motion.span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <motion.button
                      onClick={handleCheckout}
                      disabled={isLoading}
                      className="w-full bg-[#663399] hover:bg-[#563289] text-white py-2 px-4 rounded transition-colors disabled:opacity-50 flex items-center justify-center"
                      whileHover={!isLoading ? { scale: 1.05 } : {}}
                      whileTap={!isLoading ? { scale: 0.95 } : {}}
                    >
                      {isLoading ? (
                        <>
                          <motion.svg
                            className="mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </motion.svg>
                          Processing...
                        </>
                      ) : (
                        "Checkout"
                      )}
                    </motion.button>
                    <motion.button
                      onClick={() => clearCart()}
                      disabled={isLoading}
                      className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded transition-colors disabled:opacity-50"
                      whileHover={!isLoading ? { scale: 1.05 } : {}}
                      whileTap={!isLoading ? { scale: 0.95 } : {}}
                    >
                      Clear Cart
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
