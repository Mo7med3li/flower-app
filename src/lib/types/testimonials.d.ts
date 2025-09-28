declare type User = {
  _id: string;
  firstName: string;
  lastName: string;
  photo: string;
};

declare type Testimonial = {
  _id: string;
  user: User;
  rating: number;
  content: string;
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

declare type Metadata = {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
};

declare type TestimonialResponse = {
  message: string;
  metadata: Metadata;
  testimonials: Testimonial[];
};
