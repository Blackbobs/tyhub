"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useRouter } from "next/navigation"
import StaggerContainer from "@/components/animations/stagger-container"
import StaggerItem from "@/components/animations/stagger-item"

// Mock data for related products
const relatedProducts = [
  {
    id: "1",
    handle: "wireless-headphones",
    name: "Premium Wireless Headphones",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    handle: "bluetooth-speaker",
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    handle: "smart-watch",
    name: "Smart Fitness Watch",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "4",
    handle: "digital-ui-kit",
    name: "Premium UI Kit",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    isDigital: true,
  },
]

export default function RelatedProducts() {
  const prefersReducedMotion = useReducedMotion()
  const router = useRouter()

  const handleProductClick = (handle: string) => {
    router.push(`/products/${handle}`)
  }

  return (
    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {relatedProducts.map((product) => (
        <StaggerItem key={product.id}>
          <motion.div
            className="group relative overflow-hidden rounded-lg border bg-white p-3 h-full flex flex-col"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={() => handleProductClick(product.handle)}
            layoutId={`product-card-${product.id}`}
          >
            <div className="relative aspect-square overflow-hidden rounded-md bg-gray-100 mb-3">
              <motion.img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
                layoutId={`product-image-${product.id}`}
              />
              {product.isDigital && (
                <span className="absolute top-2 right-2 bg-[#663399] text-white text-xs px-2 py-1 rounded-full">
                  Digital
                </span>
              )}
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="font-medium text-sm mb-1">{product.name}</h3>
              <div className="mt-auto pt-3">
                <div className="font-bold">${product.price.toFixed(2)}</div>
                <motion.button
                  className="w-full mt-2 bg-[#663399] hover:bg-[#563289] text-white py-2 px-3 rounded text-sm transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Product
                </motion.button>
              </div>
            </div>
          </motion.div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}
