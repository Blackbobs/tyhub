"use client"

import { useCartStore } from "@/lib/cart-store"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export default function CheckoutSummary() {
  const { cart } = useCartStore()
  const prefersReducedMotion = useReducedMotion()

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 5.99
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="border rounded-lg p-6 space-y-4 sticky top-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
    >
      <h2 className="font-semibold text-xl">Order Summary</h2>

      <motion.div
        className="space-y-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {cart.map((item) => (
          <motion.div key={item.id} className="flex justify-between text-sm" variants={itemVariants}>
            <span>
              {item.name} <span className="text-gray-500">x{item.quantity}</span>
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="border-t border-gray-200 my-2 pt-2"></div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 my-2 pt-2"></div>

      <div className="flex justify-between font-medium text-lg">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </motion.div>
  )
}
