"use client"

import { useEffect, useState } from "react"
import ProductCard from "./product-card"
import { Loader2 } from "lucide-react"

// This would be replaced with a real API call to fetch related products
const fetchRelatedProducts = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "5",
      handle: "wireless-earbuds",
      name: "Wireless Earbuds",
      price: 149.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Electronics",
      variants: [
        {
          id: "variant-5",
          title: "Default",
          price: 149.99,
          availableForSale: true,
        },
      ],
    },
    {
      id: "6",
      handle: "smart-home-hub",
      name: "Smart Home Hub",
      price: 179.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Smart Home",
      variants: [
        {
          id: "variant-6",
          title: "Default",
          price: 179.99,
          availableForSale: true,
        },
      ],
    },
    {
      id: "digital-2",
      handle: "digital-marketing-ebook",
      name: "Digital Marketing eBook",
      price: 19.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Digital Products",
      isDigital: true,
      variants: [
        {
          id: "variant-digital-2",
          title: "Default",
          price: 19.99,
          availableForSale: true,
        },
      ],
    },
    {
      id: "8",
      handle: "portable-charger",
      name: "Portable Charger",
      price: 49.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Accessories",
      variants: [
        {
          id: "variant-8",
          title: "Default",
          price: 49.99,
          availableForSale: true,
        },
      ],
    },
  ]
}

export default function RelatedProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const relatedProducts = await fetchRelatedProducts()
        setProducts(relatedProducts)
      } catch (error) {
        console.error("Error loading related products:", error)
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
