"use client"

import { useEffect, useState } from "react"
import ProductCard from "./product-card"
import { Loader2 } from "lucide-react"

// This would be replaced with a real API call to fetch featured products
const fetchFeaturedProducts = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "1",
      handle: "wireless-headphones",
      name: "Wireless Headphones",
      price: 199.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Electronics",
      variants: [
        {
          id: "variant-1",
          title: "Default",
          price: 199.99,
          availableForSale: true,
        },
      ],
    },
    {
      id: "2",
      handle: "smart-watch",
      name: "Smart Watch",
      price: 249.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Electronics",
      variants: [
        {
          id: "variant-2",
          title: "Default",
          price: 249.99,
          availableForSale: true,
        },
      ],
    },
    {
      id: "3",
      handle: "bluetooth-speaker",
      name: "Bluetooth Speaker",
      price: 129.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Electronics",
      variants: [
        {
          id: "variant-3",
          title: "Default",
          price: 129.99,
          availableForSale: true,
        },
      ],
    },
    {
      id: "digital-1",
      handle: "premium-ui-kit",
      name: "Premium UI Kit",
      price: 49.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Digital Products",
      isDigital: true,
      variants: [
        {
          id: "variant-digital-1",
          title: "Default",
          price: 49.99,
          availableForSale: true,
        },
      ],
    },
  ]
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const featuredProducts = await fetchFeaturedProducts()
        setProducts(featuredProducts)
      } catch (error) {
        console.error("Error loading featured products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#663399]" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
