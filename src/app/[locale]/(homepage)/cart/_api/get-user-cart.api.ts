import { Cart } from "@/lib/types/cart";

export const getUserCart = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/cart`);
  const payload: APIResponse<Cart> = await response.json();
  if ("error" in payload) {
    throw new Error(payload.error);
  }
  return payload;
};
