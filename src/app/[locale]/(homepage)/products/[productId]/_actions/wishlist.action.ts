"use server";

import { revalidateTag } from "next/cache";
import { getAuthHeader } from "@/lib/utils/auth-header";

type WishlistCheckResult = {
  isInWishlist: boolean;
};

export async function checkWishlistAction(productId: string) {
  // Get token
  const token = (await getAuthHeader()).token;
  const response = await fetch(`${process.env.API}/wishlist/check/${productId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload: APIResponse<WishlistCheckResult> = await response.json();
  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}

export async function AddToWishlist(productId: string) {
  // Get token
  const token = (await getAuthHeader()).token;
  const response = await fetch(`${process.env.API}/wishlist`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: productId,
    }),
  });

  const payload: APIResponse<WishlistCheckResult> = await response.json();

  // Revalidate product data and wishlist data using tags (more efficient than path revalidation)
  revalidateTag(`product-${productId}`);

  return payload;
}

export async function removeFromWishlist(productId: string) {
  // Get token
  const token = (await getAuthHeader()).token;
  const response = await fetch(`${process.env.API}/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId: productId,
    }),
  });

  const payload: APIResponse<WishlistCheckResult> = await response.json();
  if (!payload.status) {
    throw new Error(payload.message || payload.error || "Failed to remove from wishlist");
  }

  // Revalidate product data and wishlist data using tags (more efficient than path revalidation)
  revalidateTag(`product-${productId}`);

  return payload;
}
