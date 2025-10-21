// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { removeFromWishlist } from "../_actions/wishlist.action";

export function useRemoveFromWishlist() {
  // translations
  const t = useTranslations();

  // Query Client
  const queryClient = useQueryClient();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (productId: string) => {
      const response = await removeFromWishlist(productId);

      if ("error" in response) {
        throw new Error(response.message || response.error || t("failed-to-remove-from-wishlist"));
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  return { isPending, error, removeFromWishlist: mutate };
}
