"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { APIResponse, SuccessfulResponse } from "@/lib/types/api";
import { CartResponse } from "@/lib/types/cart";
import { getTokenHeader } from "@/lib/utils/tokenHeader";

const applyCoupon = async (couponValue: string) => {
  // get token
  const token = await getTokenHeader();

  // apply coupon response
  const response = await fetch(`${process.env.API}/coupons/apply`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify({ code: couponValue }),
  });

  // apply coupon response payload
  const payload: APIResponse<SuccessfulResponse<CartResponse>> = await response.json();
  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
};
export default applyCoupon;
