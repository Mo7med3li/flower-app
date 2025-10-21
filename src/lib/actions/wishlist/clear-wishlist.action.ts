"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { WishlistResponse } from "@/lib/types/wishlist";
import { getTokenHeader } from "@/lib/utils/tokenHeader";

const clearWishlist = async () => {
  const token = await getTokenHeader();
  const response = await fetch(`${process.env.API}/wishlist/clear`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to clear wishlist");
  }
  const payload: APIResponse<SuccessfulResponse<WishlistResponse>> = await response.json();
  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
};
export default clearWishlist;
