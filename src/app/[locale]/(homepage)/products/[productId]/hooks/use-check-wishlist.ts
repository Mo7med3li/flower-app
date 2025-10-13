// Libraries

import { useQuery } from "@tanstack/react-query";
import { checkWishlistAction } from "../_actions/wishlist.action";

export function useCheckWishlist(productId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["wishlist", productId],
    queryFn: () => checkWishlistAction(productId),
  });

  return { data, isLoading, error };
}
