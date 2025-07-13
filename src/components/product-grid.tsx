// components/product-grid.tsx
'use client'

import ProductCard from "./product-card"
import { Loader2 } from "lucide-react"
import { useProducts } from "@/hooks/use-product"

interface ProductGridProps {
  searchQuery?: string
}

export default function ProductGrid({ searchQuery = "" }: ProductGridProps) {
  const { data: products, isLoading, error } = useProducts(searchQuery)

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
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-muted-foreground">
            Showing {products?.length || 0} {searchQuery ? "results" : "products"}
          </span>
        </div>
        <select className="p-2 border rounded-md">
          <option>Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>

      {!products?.length ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery
              ? "We couldn't find any products matching your search."
              : "No products available at the moment."}
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