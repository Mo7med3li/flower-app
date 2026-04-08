"use client";

import { useQuery } from "@tanstack/react-query";
import { CartResponse } from "@/lib/types/cart";

export default function useFetchCart() {
  const {
    isLoading,
    data: payload,
    error,
    isError,
  } = useQuery({
    queryKey: ["user-cart"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user-cart`);
      const payload: APIResponse<CartResponse> = await response.json();
      if (!payload.status) {
        throw new Error(payload.message || "Something went wrong");
      }
      return payload as SuccessfulResponse<CartResponse>;
    },
  });
  return {
    isLoading,
    payload,
    isError,
    error,
  };
}
