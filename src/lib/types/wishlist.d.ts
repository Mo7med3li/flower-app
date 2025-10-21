import { Product } from "./products";

export type Wishlist = {
  _id: string;
  user: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type WishlistResponse = {
  message: string;
  count: number;
  wishlist: Wishlist;
};
