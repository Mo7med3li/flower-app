import { useQuery } from "@tanstack/react-query";
import { WishlistResponse } from "@/lib/types/wishlist";
import { useCheckUserStatus } from "@/components/providers/components/check-user-status.provider";

export function useFetchWishlist() {
  const { isAuthenticated } = useCheckUserStatus();
  const {
    data: payload,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const response = await fetch("/api/wishlist");

      const payload: APIResponse<WishlistResponse> = await response.json();
      if (!payload.status) {
        throw new Error(payload.error || payload.message || "Failed to fetch wishlist");
      }
      return payload.payload;
    },
    enabled: isAuthenticated,
  });

  return {
    payload,
    isLoading: isAuthenticated ? isLoading : false,
    error,
  };
}
