import { Product } from "./products";

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
  userId: string;
};

export type CartResponse = {
  cartItems: CartItem[];
};
