import { AllCategory } from "@/lib/types/category";
import { APIResponse } from "@/lib/types/api";
import { PaginatedResponse } from "@/lib/types/api";

export async function getAllCategory({ searchParams }: { searchParams?: Record<string, string> }) {
  // Get page from search params, default to 1 if not provided
  const page = searchParams?.page || "1";
  const limit = searchParams?.limit || "10";

  // Declaring Get all categories API with dynamic page and limit
  const url = new URL(`${process.env.API}/categories`);

  // Add default parameters
  url.searchParams.append("page", page);
  url.searchParams.append("limit", limit);

  // This handle any given search params (excluding page and limit since we already added them)
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== "page" && key !== "limit" && value) {
        url.searchParams.append(key, value);
      }
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
