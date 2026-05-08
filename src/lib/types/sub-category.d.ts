import type { Product } from "@/lib/types/products";

declare type subCategory = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  categoryId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    title: string;
    description: string;
    image: string | null;
    immutable: boolean;
    createdAt: string;
    updatedAt: string;
  };
  products: Product[];
  _count: {
    products: number;
  };
};

declare type SubCategoryResponse = {
  subCategory: subCategory;
};
