import { CategoryType } from "@/lib/types/category";
import { APIResponse, ErrorResponse, PaginatedResponse } from "@/lib/types/api";

export const getPaginatedCategories = async ({ pageParam = 1 }) => {
  try {
    const res = await fetch(`/api/categories?page=${pageParam}&limit=6`);

    const payload: APIResponse<PaginatedResponse<CategoryType[]>> = await res.json();

    if (!res.status || (payload as ErrorResponse).error) {
      throw new Error(payload.message || "Something went wrong, please try again later");
    }

    return payload;
  } catch (err) {
    throw err;
  }
};
