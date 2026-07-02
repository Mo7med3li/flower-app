import { Category } from "@/lib/types/category";
import { APIResponse, SuccessfulResponse } from "@/lib/types/api";

export async function getSingleCategory(id: string) {
  const response = await fetch(`${process.env.API}/categories/${id}`);
  const payload: APIResponse<SuccessfulResponse<Category>> = await response.json();

  if (!payload.status) {
    throw new Error(payload.message);
  }
  return payload;
}
