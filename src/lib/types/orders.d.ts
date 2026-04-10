export type Orders = Order[];
export type Order = {
  id: string;
  userId: string;
  addressId: string;
  couponId: string | null;
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
  stripePaymentIntentId: string | null;
  subtotal: string;
  discount: string;
  shipping: string;
  total: string;
  trackingNumber: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
  address: {
    id: string;
    userId: string;
    title: string;
    isPrimary: boolean;
    city: string;
    street: string;
    phone: string;
    latitude: string;
    longitude: string;
    createdAt: string;
    updatedAt: string;
  };
  coupon: {
    id: string;
    code: string;
    // Add other coupon properties as needed
  } | null;
  orderItems: OrderItemType[];
};

export type OrderItemType = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: string;
  product: {
    id: string;
    title: string;
    cover: string;
    rating: number;
    ratings: number;
  };
};
