// All categories response type
export type AllCategory = {
  data: CategoryType[];
};

export type CategoryType = {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  subCategories: unknown[];
  _count: {
    products: number;
  };
};

declare type Category = {
  category: CategoryType;
};
