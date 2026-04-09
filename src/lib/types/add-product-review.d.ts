export type AddProductReviewResponse = {
  _id: string;
  product: string; // ID of the product
  user: string; // ID of the user
  rating: number;
  headline: string;
  content: string;
  status: "pending" | "approved" | "rejected"; // assuming possible statuses
  createdAt: string; // ISO date string
  updatedAt: string;
  __v: number;
};

export type ReviewsResponse = {
  message: string;
  status: boolean;
  code: number;
  payload: {
    data: Review[];
    metadata: {
      page: number;
      totalPages: number;
      limit: number;
      total: number;
    };
  };
};

export type Review = {
  id: string;
  product: {
    id: string;
    title: string;
  };
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
  rating: number;
  headline: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  productId: string;
};
