"use client"

import { useState } from "react"
import Link from "next/link"
import { useCartStore } from "@/lib/cart-store"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface Product {
  id: string
  handle: string
  name: string
  price: number
  image: string
  category: string
  isDigital?: boolean
  variants?: {
    id: string
    title: string
    price: number
    availableForSale: boolean
  }[]
}

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCartStore()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Get the first variant or create a default one
  const defaultVariant =
    product.variants && product.variants.length > 0
      ? product.variants[0]
      : { id: product.id, title: "Default", price: product.price, availableForSale: true }

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      await addToCart(defaultVariant.id, 1)
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    } catch (error) {
      // Error is handled by the cart store and displayed via toast
    } finally {
      setIsLoading(false)
    }
  }

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      initial="hidden"
      animate="visible"
      variants={prefersReducedMotion ? {} : cardVariants}
      custom={index}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.handle}`}>
        <div className="aspect-square relative overflow-hidden">
          <motion.img
            src={product.image || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            className="object-cover w-full h-full"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
          
        </div>
      </Link>
      <div className="p-4">
        <motion.div
          className="text-sm text-gray-500 mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {product.category}
        </motion.div>
        <Link href={`/products/${product.handle}`} className="hover:underline">
          <motion.h3
            className="font-medium text-lg mb-2 line-clamp-1 text-[#171717]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {product.name}
          </motion.h3>
        </Link>
        <motion.div
          className="font-bold mb-4 text-[#171717]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ${product.price.toFixed(2)}
        </motion.div>
        <motion.button
          onClick={handleAddToCart}
          disabled={isLoading || !defaultVariant.availableForSale}
          className="w-full bg-[#663399] hover:bg-[#563289] text-white font-semibold py-2 px-4 rounded transition-colors disabled:opacity-50 flex items-center justify-center"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.6 }}
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
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </motion.svg>
              Adding...
            </>
          ) :  <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Add to Cart
            </>}
        </motion.button>
      </div>
    </motion.div>
  )
}
