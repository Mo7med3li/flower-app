declare type DataBaseProbs = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

declare type ErrorResponse = {
  status: false;
  code?: string | number;
  message?: string;
  error?: string;
  errors?: {
    message: string;
    path?: string;
  }[];
};

declare type SuccessfulResponse<T> = {
  status: true;
  code: string | number;
  message: string;
  payload?: T; // For endpoints using "payload" wrapper (like login)
  data?: T; // For endpoints using "data" wrapper (like products)
};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;

//^ the user response after a successful login
declare type ApplicationUser = {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  photo?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: string;
  wishlist: string[];
  addresses: string[];
  createdAt: string;
  updatedAt: string;
};

declare type LoginResponse = {
  message?: string;
  user: ApplicationUser;
  token: string;
};

declare type PaginatedResponse<T> = {
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
    nextPage?: number;
  };
} & T;

declare type CommonSearchParams = {
  // ! Pagination and projection
  limit?: number; // Number of items per page (for pagination)
  page?: number; // Current page number (for pagination)
  sort?: string; // Sorting criteria, e.g., 'price,-title'
  fields?: string; // Comma-separated list of fields to include in the response
  keyword?: string; // Search keyword for full-text search
  search?: string; // for searching
};

declare type UpdateProfileFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};
declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;
