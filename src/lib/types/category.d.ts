// All categories response type
export type AllCategory = {
  data: CategoryType[];
};
export type SubCategoryType = {
  id: string;
  title: string;
};
export type CategoryType = {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  subCategories: SubCategoryType[];
  _count: {
    products: number;
  };
};

declare type Category = {
  category: CategoryType;
};
