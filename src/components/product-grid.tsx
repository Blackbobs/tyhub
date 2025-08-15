// components/product-grid.tsx
'use client'

import ProductCard from "./product-card"
import { Loader2, PackageX } from "lucide-react"
import { useProducts } from "@/hooks/use-product"



export default function ProductGrid() {
  const { data: products, isLoading, error } = useProducts()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#663399]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12 text-red-500">
        Failed to load products
      </div>
    )
  }

  return (
    <div>
     

     {!products?.length ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <PackageX className="w-10 h-10 mb-2" />
          <h3 className="text-lg font-medium mb-2">No products available</h3>
          <p className="text-muted-foreground">
            Please check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}  
    </div>
  )
}