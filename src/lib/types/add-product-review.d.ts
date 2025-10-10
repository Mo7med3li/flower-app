declare type AddProductReviewResponse = {
  _id: string;
  product: string; // ID of the product
  user: string; // ID of the user
  rating: number;
  title: string;
  comment: string;
  status: "pending" | "approved" | "rejected"; // assuming possible statuses
  createdAt: string; // ISO date string
  updatedAt: string;
  __v: number;
};

export type ReviewsResponse = {
  message: string;
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
  };
  reviews: Review[];
};

export type Review = {
  _id: string;
  product: {
    _id: string;
    title: string;
    imgCover: string;
    id: string;
  };
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    photo: string;
  };
  rating: number;
  title: string;
  comment: string;
  status: "approved" | "pending" | "rejected";
  createdAt: string;
  updatedAt: string;
  __v: number;
};
