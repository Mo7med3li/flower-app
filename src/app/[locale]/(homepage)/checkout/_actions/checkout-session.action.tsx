import { Address } from "@/lib/types/user-addresses";
import { CheckoutSessionTS } from "@/lib/types/checkout-session";
import { getAuthHeader } from "@/lib/utils/auth-header";
import { APIResponse, SuccessfulResponse } from "@/lib/types/api";

export default async function CheckCreditOrder(shippingAddress: Address) {
  const response = await fetch(
    `${process.env.API}/orders/checkout?url=${process.env.NEXT_PUBLIC_BASE_URL}`,
    {
      method: "POST",
      headers: {
        ...(await getAuthHeader()),
      },
      body: JSON.stringify({
        addressId: shippingAddress.id,
      }),
    },
  );

  const payload: APIResponse<CheckoutSessionTS> = await response.json();

  if (!payload.status) {
    throw new Error(payload.message || "Something went wrong");
  }

  return payload as SuccessfulResponse<CheckoutSessionTS>;
}
