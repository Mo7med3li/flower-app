"use server";
import { revalidatePath } from "next/cache";
import { getAuthHeader } from "@/lib/utils/auth-header";
import { Products } from "@/lib/types/products";
import { APIResponse, SuccessfulResponse } from "@/lib/types/api";

export async function addProductAction(formData: FormData) {
  const response = await fetch(`${process.env.API}/products`, {
    method: "POST",
    body: formData,
    headers: {
      ...(await getAuthHeader()),
    },
  });

  const payload = await response.json();

  return payload;
}

export default async function deleteProductAction(productId: string) {
  const headers = await getAuthHeader();

  const response = await fetch(`${process.env.API}/products/${productId}`, {
    method: "DELETE",
    headers,
  });

  const payload: APIResponse<SuccessfulResponse<Products>> = await response.json();

  if (!payload.status) {
    throw new Error(payload.message || "Something went wrong");
  }

  // Revalidate so the UI updates without a manual refresh
  revalidatePath("/dashboard/products");

  return payload;
}
