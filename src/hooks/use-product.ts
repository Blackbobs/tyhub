// hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query'
import { getProductById, getProducts, productKeys } from '@/services/product.service'

export const useProducts = (searchQuery?: string) => {
  return useQuery({
    queryKey: productKeys.list(searchQuery || ''),
    queryFn: () => getProducts(searchQuery),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useRelatedProducts = (productId: string) => {
  return useQuery({
    queryKey: [...productKeys.all, 'related', productId],
    queryFn: () => {
      // In a real app, you might have a dedicated endpoint for related products
      return getProducts().then(products => 
        products
          .filter(p => p._id !== productId)
          .sort(() => 0.5 - Math.random())
          .slice(0, 4)
      )
    },
  })
}