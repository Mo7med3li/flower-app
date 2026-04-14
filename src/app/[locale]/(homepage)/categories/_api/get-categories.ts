import { AllCategory } from "@/lib/types/category";

export async function getAllCategory({ searchParams }: { searchParams?: URLSearchParams }) {
  // Declaring Get all categories API
  const url = new URL(`${process.env.API}/categories`);

  // This handle any given search params
  if (searchParams?.size && searchParams?.size > 0) {
    searchParams.forEach((value, key) => {
      url.searchParams.append(key, value);
    });
  }

  // Extracting only the API link
  const response = await fetch(url);

  // Returning the Category results
  const payload: APIResponse<PaginatedResponse<AllCategory>> = await response.json();
  if (!payload.status) {
    throw new Error(payload.message || "Error Fetching the categories");
  }

  return payload;
}
