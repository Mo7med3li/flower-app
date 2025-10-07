import { Categories } from "@/lib/types/category";

export const getPaginatedCategories = async ({ pageParam = 1 }) => {
  try {
    const res = await fetch(`/api/categories?page=${pageParam}&limit=6`);

    const payload: APIResponse<PaginatedResponse<{ categories: Categories[] }>> = await res.json();

    if (!res.ok || (payload as ErrorResponse).error) {
      throw new Error(
        (payload as ErrorResponse).error || "Something went wrong, please try again later",
      );
    }

    return payload as PaginatedResponse<SuccessfulResponse<{ categories: Categories[] }>>;
  } catch (err) {
    throw err;
  }
};
