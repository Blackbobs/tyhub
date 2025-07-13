// app/products/page.tsx
import { ProductFilter } from "@/components/product-filter"
import ProductGrid from "@/components/product-grid"
import type { Metadata } from "next"
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getProducts } from '@/services/product.service'
import { getQueryClient } from "@/utils/get-query-clients"

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our complete collection of premium products.",
}

export default async function ProductsPage({ 
  searchParams 
}: { 
  searchParams: { search?: string } 
}) {
  const searchQuery = searchParams.search || ""
  const queryClient = getQueryClient  ()
  
  await queryClient.prefetchQuery({
    queryKey: ['products', 'list', searchQuery],
    queryFn: () => getProducts(searchQuery),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-8">
          {searchQuery ? `Search Results: "${searchQuery}"` : "All Products"}
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <ProductGrid searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  )
}