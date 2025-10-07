// All categories response type
export type AllCategory = {
  categories: Categories[];
};

type Categories = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
} & DataBaseProbs;

declare type Category = {
  category: Categories;
};
