"use server";

import { revalidatePath } from "next/cache";
import { getAuthHeader } from "@/lib/utils/auth-header";
import { Products } from "@/lib/types/products";
import { APIResponse, SuccessfulResponse } from "@/lib/types/api";

export default async function deleteOccasionAction(productId: string) {
  const headers = await getAuthHeader();

  const response = await fetch(`${process.env.API}/occasions/${productId}`, {
    method: "DELETE",
    headers: {
      ...headers,
    },
  });

  const payload: APIResponse<SuccessfulResponse<Products>> = await response.json();

  if (!payload.status) {
    throw new Error(payload.message || "Something went wrong");
  }

  // Revalidate so the UI updates without a manual refresh
  revalidatePath("/dashboard/occasions");

  return payload;
}
