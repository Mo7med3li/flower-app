"use client";

import { useQuery } from "@tanstack/react-query";

import { CartResponse } from "@/lib/types/cart";
import { useCheckUserStatus } from "@/components/providers/components/check-user-status.provider";

export default function useFetchCart() {
  const { isAuthenticated } = useCheckUserStatus();
  const {
    isLoading,
    data: payload,
    error,
    isError,
  } = useQuery({
    queryKey: ["user-cart"],
    queryFn: async () => {
      const response = await fetch("/api/user-cart");
      const payload: APIResponse<CartResponse> = await response.json();
      if (!payload.status) {
        throw new Error(payload.message || "Something went wrong");
      }
      return payload as SuccessfulResponse<CartResponse>;
    },
    enabled: isAuthenticated,
  });
  return {
    isLoading: isAuthenticated ? isLoading : false,
    payload,
    isError,
    error,
  };
}
