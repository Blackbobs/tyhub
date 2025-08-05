export type Product = {
  _id: string;
  title: string;
  price: number;
  images?: { url: string }[];
};

export type OrderItem = {
  product: Product;
  quantity: number;
  price: number;
};

export type PaymentInfo = {
  method: string;
  reference?: string;
  status?: 'success' | 'failed' | 'cancelled';
};

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type Order = {
  _id: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentInfo?: PaymentInfo;
  isDigital: boolean;
  createdAt: string;
  updatedAt: string;
};
