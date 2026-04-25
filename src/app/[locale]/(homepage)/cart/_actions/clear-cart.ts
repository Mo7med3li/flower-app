"use server";

import { revalidateTag } from "next/cache";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { CartResponse } from "@/lib/types/cart";
import { getTokenHeader } from "@/lib/utils/tokenHeader";

const clearCart = async () => {
  const token = await getTokenHeader();
  const response = await fetch(`${process.env.API}/cart`, {
    method: "DELETE",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
  });
  if (!response.status) {
    throw new Error("Failed to clear cart");
  }
  const payload: APIResponse<SuccessfulResponse<CartResponse>> = await response.json();
  if ("error" in payload) {
    throw new Error(payload.error);
  }
  revalidateTag("product");
  return payload;
};
export default clearCart;
