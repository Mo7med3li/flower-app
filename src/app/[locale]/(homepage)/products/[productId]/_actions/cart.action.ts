"use server";

import { revalidateTag } from "next/cache";
import { getAuthHeader } from "@/lib/utils/auth-header";
import { Product } from "@/lib/types/products";

export type AddToCartResult = {
  message: string;
  payload: {
    cartItem: {
      id: string;
      userId: string;
      productId: string;
      quantity: number;
      createdAt: string;
      updatedAt: string;
      product: Product;
    };
  };
};

export async function addToCartAction(productId: string, quantity: number = 1) {
  // Get token
  const token = (await getAuthHeader()).token;

  const response = await fetch(`${process.env.API}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });

  const payload: APIResponse<AddToCartResult> = await response.json();
  if (!payload.status) {
    throw new Error(payload.message);
  }
  revalidateTag(`product-${productId}`);

  return payload;
}
