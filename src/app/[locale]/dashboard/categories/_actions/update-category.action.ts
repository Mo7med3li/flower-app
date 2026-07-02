"use server";

import { Category } from "@/lib/types/category";
import { getTokenHeader } from "@/lib/utils/tokenHeader";
import { APIResponse, SuccessfulResponse } from "@/lib/types/api";

export async function updateCategory({ formData, id }: { formData: FormData; id: string }) {
  const token = await getTokenHeader();

  const response = await fetch(`${process.env.API}/categories/${id}`, {
    method: "PUT",
    body: formData,
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token.token}`,
    },
  });

  const payload: APIResponse<SuccessfulResponse<Category>> = await response.json();

  if (!payload.status) {
    throw new Error(payload.message || "Something went wrong");
  }

  return payload;
}
