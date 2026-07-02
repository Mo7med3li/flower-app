"use server";

import { revalidateTag } from "next/cache";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { CartResponse } from "@/lib/types/cart";
import { getTokenHeader } from "@/lib/utils/tokenHeader";
import { APIResponse, SuccessfulResponse } from "@/lib/types/api";

const removeProductCart = async (cartItemId: string) => {
  // token
  const token = await getTokenHeader();

  // response
  const response = await fetch(`${process.env.API}/cart/${cartItemId}`, {
    method: "DELETE",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
  });
  if (!response.status) {
    throw new Error("Failed to remove product from cart");
  }
  const payload: APIResponse<SuccessfulResponse<CartResponse>> = await response.json();
  if ("error" in payload) {
    throw new Error(payload.error);
  }
  revalidateTag(`product-${cartItemId}`);
  return payload;
};
export default removeProductCart;
