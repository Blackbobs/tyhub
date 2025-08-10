import axiosConfig from "@/utils/axios-config";

export type ProductType = 'physical' | 'digital';

export interface Product {
  _id: string;
  title: string;
  description?: string;
  price: number;
  images: {
    url: string;
    publicId: string;
  }[];
  type: ProductType;
  stock?: number;
  file?: {
    url: string;
    publicId: string;
  };
  sizes?: string[]; 
  colors?: string[];
  createdAt: string;
  updatedAt: string;
}

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: string) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
}

export const getProducts = async (searchQuery?: string): Promise<Product[]> => {
  const response = await axiosConfig.get('/products', {
    params: { search: searchQuery }
  })
  return response.data.products
}

export const getProductById = async (id: string): Promise<Product> => {
  if (!id) {
    throw new Error('Product ID is required');
  }
  
  const response = await axiosConfig.get(`/products/${id}`);
  return response.data.product;
};


