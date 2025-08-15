import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  createCheckoutSession
} from '@/services/cart.service';
import { useToast } from "@/context/toast-context";
import { ICart } from '@/interface/cart';
import { useAuthStore } from '@/store/auth-store';

export const useCart = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {user} = useAuthStore()

 
  const { 
    data: cart = { items: [] }, 
    isLoading, 
    error,
    isFetching 
  } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: !!user
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
     
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart',
      });
    }
  });

  const updateCartItemMutation = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update cart item',
      });
    }
  });


  const removeFromCartMutation = useMutation({
    mutationFn: removeFromCart,
    onMutate: async (productId) => {
      // Correct cancellation syntax
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      
      // Optimistically update
      queryClient.setQueryData<ICart | undefined>(['cart'], (old) => {
        if(!old) return undefined

        return{
          ...old,
          items: old.items.filter(item => item.product._id !== productId)
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: 'Removed from cart',
        description: 'Item has been removed from your cart.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to remove item from cart',
      });
    }
  });
  
  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      queryClient.setQueryData(['cart'], { items: [] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: 'Cart cleared',
        description: 'Your cart has been cleared.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to clear cart',
      });
    }
  });

  const checkoutMutation = useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (sessionUrl) => {
      if (sessionUrl) {
        window.location.href = sessionUrl;
      }
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to initiate checkout',
      });
    }
  });

  return {
    cart,
    isLoading,
    isFetching,
    error,
    addToCart: addToCartMutation.mutateAsync,
    updateCartItem: updateCartItemMutation.mutateAsync,
    removeFromCart: removeFromCartMutation.mutateAsync,
    clearCart: clearCartMutation.mutateAsync,
    checkout: checkoutMutation.mutateAsync,
    isCheckingOut: checkoutMutation.isPending,
    isMutating: 
      addToCartMutation.isPending || 
      updateCartItemMutation.isPending || 
      removeFromCartMutation.isPending || 
      clearCartMutation.isPending,
  };
};