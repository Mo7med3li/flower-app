import { Product } from "./products";

export type Wishlist = {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  product: Product;
};

export type WishlistResponse = {
  message: string;
  count: number;
  wishlistItems: WishlistItem[];
};
