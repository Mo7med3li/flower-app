import { AllCategory } from "@/lib/types/category";

export async function getAllCategory() {
  const response = await fetch("/api/categories");

  const payload: APIResponse<PaginatedResponse<AllCategory>> = await response.json();
  if ("error" in payload) {
    throw new Error("Error Fetching the categories");
  }

  return payload;
}
