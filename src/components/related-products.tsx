// components/related-products.tsx
'use client'

import { motion } from "framer-motion"
import { Product } from "@/services/product.service"
import ProductCard from "./product-card"

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div
          key={product._id}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  )
}