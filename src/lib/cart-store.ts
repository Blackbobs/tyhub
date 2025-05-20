import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartItem {
  id: string
  variantId: string
  title: string
  productTitle: string
  handle: string
  quantity: number
  price: {
    amount: string
    currencyCode: string
  }
  image: {
    url: string
    altText: string
  } | null
}

interface CartState {
  items: CartItem[]
  isLoading: boolean
  error: string | null

  // Actions
  fetchCart: () => Promise<void>
  addToCart: (variantId: string, quantity: number) => Promise<void>
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>
  removeFromCart: (lineItemId: string) => Promise<void>
  clearCart: () => Promise<void>

  // Computed values
  totalItems: number
  subtotal: number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,

      fetchCart: async () => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch("/api/shopify/cart/get")
          const data = await response.json()

          if (data.error) {
            throw new Error(data.error)
          }

          set({
            items: data.cart?.items || [],
            isLoading: false,
          })
        } catch (error: any) {
          set({
            error: error.message || "Failed to fetch cart",
            isLoading: false,
          })
        }
      },

      addToCart: async (variantId, quantity) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch("/api/shopify/cart/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: [{ variantId, quantity }],
            }),
          })

          const data = await response.json()

          if (data.error) {
            throw new Error(data.error)
          }

          // Refresh the cart
          await get().fetchCart()
        } catch (error: any) {
          set({
            error: error.message || "Failed to add item to cart",
            isLoading: false,
          })
        }
      },

      updateQuantity: async (lineItemId, quantity) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch("/api/shopify/cart/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: [{ id: lineItemId, quantity }],
            }),
          })

          const data = await response.json()

          if (data.error) {
            throw new Error(data.error)
          }

          // Refresh the cart
          await get().fetchCart()
        } catch (error: any) {
          set({
            error: error.message || "Failed to update cart",
            isLoading: false,
          })
        }
      },

      removeFromCart: async (lineItemId) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch("/api/shopify/cart/remove", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              itemIds: [lineItemId],
            }),
          })

          const data = await response.json()

          if (data.error) {
            throw new Error(data.error)
          }

          // Refresh the cart
          await get().fetchCart()
        } catch (error: any) {
          set({
            error: error.message || "Failed to remove item from cart",
            isLoading: false,
          })
        }
      },

      clearCart: async () => {
        set({ isLoading: true, error: null })
        try {
          // Remove all items one by one
          const itemIds = get().items.map((item) => item.id)

          if (itemIds.length > 0) {
            const response = await fetch("/api/shopify/cart/remove", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                itemIds,
              }),
            })

            const data = await response.json()

            if (data.error) {
              throw new Error(data.error)
            }
          }

          set({
            items: [],
            isLoading: false,
          })
        } catch (error: any) {
          set({
            error: error.message || "Failed to clear cart",
            isLoading: false,
          })
        }
      },

      // Computed values
      get totalItems() {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      get subtotal() {
        return get().items.reduce((total, item) => {
          return total + Number.parseFloat(item.price.amount) * item.quantity
        }, 0)
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
