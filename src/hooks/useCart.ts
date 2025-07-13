import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '@/services/cart.service';
import { useToast } from './use-toast';

export const useCart = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });
  const cart = {
    ...data,
    items: data?.items ?? [],
  };

  const addToCartMutation = useMutation({
    mutationFn: (data: { productId: string; quantity: number }) => addToCart(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
      toast({
        title: 'Added to cart',
        description: 'Item has been added to your cart.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart',
      });
    },
  });

  const updateCartItemMutation = useMutation({
    mutationFn: updateCartItem,
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update cart item',
      });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
      toast({
        title: 'Removed from cart',
        description: 'Item has been removed from your cart.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to remove item from cart',
      });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
      toast({
        title: 'Cart cleared',
        description: 'Your cart has been cleared.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to clear cart',
      });
    },
  });

  return {
    cart,
    isLoading,
    error,
    addToCart: addToCartMutation.mutateAsync,
    updateCartItem: updateCartItemMutation.mutateAsync,
    removeFromCart: removeFromCartMutation.mutateAsync,
    clearCart: clearCartMutation.mutateAsync,
    isMutating: 
      addToCartMutation.isPending || 
      updateCartItemMutation.isPending || 
      removeFromCartMutation.isPending || 
      clearCartMutation.isPending,
  };
};