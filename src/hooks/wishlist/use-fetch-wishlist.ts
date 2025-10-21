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

      const payload: APIResponse<SuccessfulResponse<WishlistResponse>> = await response.json();
      if ("error" in payload) {
        throw new Error(payload.error);
      }
      return payload;
    },
  });

  return { payload, isLoading, error };
}
