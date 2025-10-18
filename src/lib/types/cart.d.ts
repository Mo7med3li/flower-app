import { Product } from "./products";

export type CartItem = {
  product: Product;
  price: number;
  quantity: number;
  _id: string;
};
export type Cart = {
  _id: string;
  user: string;
  cartItems: CartItem[];
  appliedCoupons: string[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
};

export type CartResponse = {
  message: string;
  numOfCartItems: number;
  cart: {
    _id: string;
    user: string;
    cartItems: {
      product: Product;
      price: number;
      quantity: number;
      _id: string;
    }[];
    appliedCoupons: string[];
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};
