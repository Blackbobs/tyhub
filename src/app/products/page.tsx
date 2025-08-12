import ProductGrid from "@/components/product-grid"
import type { Metadata } from "next"
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getProducts, productKeys } from '@/services/product.service'
import { getQueryClient } from "@/utils/get-query-clients"

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our complete collection of premium products.",
}

export default async function ProductsPage() {
 
  const queryClient = getQueryClient  ()
  
  await queryClient.prefetchQuery({
    queryKey: productKeys.list(''),
    queryFn: () => getProducts(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-8">
        All Products
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <ProductGrid />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  )
}