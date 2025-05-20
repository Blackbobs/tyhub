"use client"

import { useCartStore } from "@/lib/store"
import ProductCard from "./product-card"

// This would normally be fetched from Shopify
const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 249.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
  },
  {
    id: "4",
    name: "Fitness Tracker",
    price: 99.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Fitness",
  },
  {
    id: "5",
    name: "Wireless Earbuds",
    price: 149.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
  },
  {
    id: "6",
    name: "Smart Home Hub",
    price: 179.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Smart Home",
  },
  {
    id: "digital-1",
    name: "Premium UI Kit",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Digital Products",
    isDigital: true,
  },
  {
    id: "digital-2",
    name: "Digital Marketing eBook",
    price: 19.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Digital Products",
    isDigital: true,
  },
]

interface ProductGridProps {
  searchQuery?: string
}

export default function ProductGrid({ searchQuery = "" }: ProductGridProps) {
  const { addToCart } = useCartStore()

  // Filter products based on search query if provided
  const filteredProducts = searchQuery
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : products

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-muted-foreground">
            Showing {filteredProducts.length} {searchQuery ? "results" : "products"}
          </span>
        </div>
        <select className="p-2 border rounded-md">
          <option>Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">We couldn't find any products matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
          ))}
        </div>
      )}
    </div>
  )
}
