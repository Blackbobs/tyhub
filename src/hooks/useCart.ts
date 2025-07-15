// hooks/useCart.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  createCheckoutSession
} from '@/services/cart.service';
import { useToast } from './use-toast';

export const useCart = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Normal data fetching
  const { 
    data: cart = { items: [] }, 
    isLoading, 
    error,
    isFetching 
  } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      // Correct invalidation syntax
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: 'Added to cart',
        description: 'Item has been added to your cart.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart',
      });
    }
  });

  // Update cart item mutation
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

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: removeFromCart,
    onMutate: async (productId) => {
      // Correct cancellation syntax
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      
      // Optimistically update
      queryClient.setQueryData(['cart'], (old: any) => ({
        ...old,
        items: old?.items?.filter((item: any) => item.product._id !== productId) || []
      }));
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

  // Clear cart mutation
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