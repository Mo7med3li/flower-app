"use server";

import { Category } from "@/lib/types/category";
import { getTokenHeader } from "@/lib/utils/tokenHeader";
import { APIResponse, SuccessfulResponse } from "@/lib/types/api";

export async function AddCategory(formData: FormData) {
  // const locale = useLocale();
  const token = await getTokenHeader();

  const response = await fetch(`${process.env.API}/categories`, {
    method: "POST",
    body: formData,
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token.token}`,
    },
  });

  const payload: APIResponse<SuccessfulResponse<Category>> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
