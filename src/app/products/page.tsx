import { ProductFilter } from "@/components/product-filter"
import ProductGrid from "@/components/product-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse our complete collection of premium products. Find the perfect items for your lifestyle with fast shipping and secure checkout.",
  openGraph: {
    title: "All Products | ShopDrop",
    description:
      "Browse our complete collection of premium products. Find the perfect items for your lifestyle with fast shipping and secure checkout.",
    url: "/products",
    images: [
      {
        url: "/og-products.jpg",
        width: 1200,
        height: 630,
        alt: "ShopDrop Products Collection",
      },
    ],
  },
}

export default function ProductsPage({ searchParams }: { searchParams: { search?: string } }) {
  // If there's a search query in the URL, we can use it to filter products
  const searchQuery = searchParams.search || ""

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">{searchQuery ? `Search Results: "${searchQuery}"` : "All Products"}</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <ProductFilter />
        </div>

        <div className="flex-1">
          <ProductGrid searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  )
}
