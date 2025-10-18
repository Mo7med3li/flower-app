"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { CartResponse } from "@/lib/types/cart";
import { getTokenHeader } from "@/lib/utils/tokenHeader";

const updateCartQuantity = async (productId: string, quantity: number) => {
  const token = await getTokenHeader();
  const response = await fetch(`${process.env.API}/cart/${productId}`, {
    method: "PUT",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) {
    throw new Error("Failed to update cart quantity");
  }
  const payload: APIResponse<SuccessfulResponse<CartResponse>> = await response.json();
  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
};
export default updateCartQuantity;
