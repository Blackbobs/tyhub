

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
    size?: string; 
    color?: string;
  }

  export interface ICart {
    _id: string;
    user: string;
    items: ICartItem[];
    createdAt?: Date;
    updatedAt?: Date;
  }