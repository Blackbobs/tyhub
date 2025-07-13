import { Product } from "@/services/product.service";

export interface ICartItem {
    product: Product;
    quantity: number;
  }

  export interface ICart extends Document {
    _id: string;
    user: string;
    items: ICartItem[];
    createdAt?: Date;
    updatedAt?: Date;
  }