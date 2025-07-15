import { ICart } from "@/interface/cart";
import axiosConfig from "@/utils/axios-config";

export const getCart = async (): Promise<ICart> => {
  const response = await axiosConfig.get("/cart");
  return response.data;
};

export const addToCart = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}): Promise<ICart> => {
  const response = await axiosConfig.post("/cart", { productId, quantity });
  return response.data;
};

export const updateCartItem = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}): Promise<ICart> => {
  const response = await axiosConfig.put(`/cart/${productId}`, { quantity });
  return response.data;
};

export const removeFromCart = async (productId: string): Promise<ICart> => {
  const response = await axiosConfig.delete(`/cart/${productId}`);
  return response.data;
};

export const clearCart = async (): Promise<ICart> => {
  const response = await axiosConfig.delete("/cart/clear");
  return response.data;
};

export const createCheckoutSession = async (): Promise<string> => {
  const response = await axiosConfig.post<{ url: string }>('/checkout/create-session');
  return response.data.url;
};
