import { APIResponse } from "@/lib/types/api";
import { SubCategoryResponse } from "@/lib/types/sub-category";

export const getSubCategory = async (subId: string) => {
  const response = await fetch(`${process.env.API}/sub-categories/${subId}`);
  const payload: APIResponse<SubCategoryResponse> = await response.json();
  if (!payload.status) {
    throw new Error(payload.message);
  }
  return payload;
};
