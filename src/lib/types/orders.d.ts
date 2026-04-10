import { Product } from "./products";

export type Orders = Order[];
export type Order = {
  id: string;
  userId: string;
  addressId: string;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "REFUNDED";
  paymentMethod: "CASH_ON_DELIVERY" | "CREDIT_CARD";
  paymentStatus: "PENDING" | "PROCESSING" | "SUCCEEDED" | "FAILED" | "REFUNDED" | "CANCELLED";
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  trackingNumber: string | null;
  notes: string | null;
  orderItems: OrderItemType[];
  createdAt: string;
  updatedAt: string;
};

export type OrderItemType = {
  product: Product;
  price: number;
  quantity: number;
  _id: string;
};
