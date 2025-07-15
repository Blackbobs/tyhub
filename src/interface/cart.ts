import { Product } from "@/services/product.service";

export interface ICartItem {
  product: {
    _id: string;
    title: string;
    price: number;
    images: {
      url: string;
      publicId: string;
    }[];
  };
    quantity: number;
  }

  export interface ICart extends Document {
    _id: string;
    user: string;
    items: ICartItem[];
    createdAt?: Date;
    updatedAt?: Date;
  }