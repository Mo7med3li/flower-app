"use server";
import { revalidateTag } from "next/cache";
import { Address } from "@/lib/types/user-addresses";
import { getAuthHeader } from "@/lib/utils/auth-header";

interface CashOrderData {
  addressId: string;
  paymentMethod: "CASH_ON_DELIVERY" | "CREDIT_CARD";
  couponCode?: string;
  notes?: string;
}

export default async function CheckCashOrder(
  shippingAddress: Address,
  couponCode?: string,
  notes?: string,
) {
  const orderData: CashOrderData = {
    addressId: shippingAddress.id,
    paymentMethod: "CASH_ON_DELIVERY",
  };

  if (couponCode) {
    orderData.couponCode = couponCode;
  }

  if (notes) {
    orderData.notes = notes;
  }

  const response = await fetch(`${process.env.API}/orders`, {
    method: "POST",
    headers: {
      ...(await getAuthHeader()),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  const payload: APIResponse<unknown> = await response.json();

  if (!payload.status) {
    throw new Error(payload.message || "Something went wrong");
  }
  revalidateTag("user-cart");
  return payload;
}
