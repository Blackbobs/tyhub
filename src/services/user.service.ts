import { Order } from "@/interface/order";
import axiosConfig from "@/utils/axios-config";

 interface User {
  username: string;
  email: string;
  profilePicture?: string;
  address?: string;
};


export const getUserDetails = async () => {
  const response = await axiosConfig.get(`/users/me`);
  return response.data;
};

export const updateUserDetails = async (data: User) => {
  const response = await axiosConfig.put(`/users/me`, data);
  return response.data;
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await axiosConfig.put(`/users/change-password`, data);
  return response.data;
};

export const getUserOrders = async (): Promise<Order[]> => {
  const response = await axiosConfig.get(`/orders/user`);
  return response.data.orders || [];
};

export const getOrderDetails = async (orderId: string): Promise<Order> => {
  const response = await axiosConfig.get(`/orders/${orderId}`);
  return response.data.order || [];
};