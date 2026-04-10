declare type DatabaseProps = {
  id: string;
  _id?: string; // fallback
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

declare type ErrorResponse = {
  status: false;
  code: string | number;
  message: string;
  error: string;
  errors?: {
    message: string;
    path?: string;
  }[];
};

declare type SuccessfulResponse<T> = {
  status: true;
  code: string | number;
  message: string;
  payload: T; // For endpoints using "payload" wrapper (like login)
  // For endpoints using "data" wrapper (like products)
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
  gender: "MALE" | "FEMALE";
  photo?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  createdAt: string;
  updatedAt: string;
};

declare type LoginResponse = {
  message?: string;
  user: ApplicationUser;
  token: string;
};

declare type PaginatedResponse<T> = {
  data: T;
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

declare type CommonSearchParams = {
  // ! Pagination and projection
  limit?: number | string; // Number of items per page (for pagination)
  page?: number | string; // Current page number (for pagination)
  sort?: string; // Sorting criteria, e.g., 'price,-title'
  fields?: string; // Comma-separated list of fields to include in the response
  keyword?: string; // Search keyword for full-text search
  search?: string; // for searching
};

declare type UpdateProfileFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  gender?: "male" | "female" | "MALE" | "FEMALE";
};
