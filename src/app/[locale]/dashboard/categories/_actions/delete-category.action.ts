"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { APIResponse } from "@/lib/types/api";
import { Category } from "@/lib/types/category";
import { getTokenHeader } from "@/lib/utils/tokenHeader";

export async function deleteCategory(id: string) {
  // Token
  const token = await getTokenHeader();

  const response = await fetch(`${process.env.API}/categories/${id}`, {
    method: "DELETE",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token} `,
    },
  });

  const payload: APIResponse<Category> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
