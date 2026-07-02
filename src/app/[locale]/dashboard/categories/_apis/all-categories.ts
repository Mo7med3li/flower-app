import { APIResponse } from "@/lib/types/api";
import { AllCategory } from "@/lib/types/category";

export async function getAllCategories() {
  const response = await fetch("http://localhost:3000/api/categories", {
    next: {
      tags: ["categories"],
    },
    cache: "no-store",
  });

  const payload: APIResponse<AllCategory> = await response.json();

  if (!payload.status) {
    throw new Error(payload.message);
  }
  return payload;
}
