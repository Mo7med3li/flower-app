export type DatabaseProps = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type occasion = {
  title: string;
  slug: string;
  image: string;
  isSuperAdmin: boolean;
  _count: {
    products: number;
  };
} & DatabaseProps;

export type occasions = {
  data: occasion[];
};

export type SearchParamOcassion = {
  title?: string;
  slug?: string;
  page?: string;
  limit?: string;
};
