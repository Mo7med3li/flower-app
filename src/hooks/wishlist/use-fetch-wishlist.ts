import { useQuery } from "@tanstack/react-query";
import { WishlistResponse } from "@/lib/types/wishlist";

export function useFetchWishlist() {
  const {
    data: payload,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/wishlist`);

      const payload: APIResponse<WishlistResponse> = await response.json();
      if (!payload.status) {
        throw new Error(payload.error || payload.message || "Failed to fetch wishlist");
      }
      return payload.payload;
    },
  });

  return { payload, isLoading, error };
}
