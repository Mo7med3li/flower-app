import { AllCategory } from "../types/category";
import { APIResponse, PaginatedResponse } from "../types/api";

export async function getAllCategory() {
  const response = await fetch(`${process.env.API}/categories`);
  if (!response.ok) {
    throw new Error("Error Fetching the categories");
  }

  const payload: APIResponse<PaginatedResponse<AllCategory>> = await response.json();

  return payload;
}
