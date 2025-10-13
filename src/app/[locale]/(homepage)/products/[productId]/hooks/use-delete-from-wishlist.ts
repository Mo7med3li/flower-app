// Libraries
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { removeFromWishlist } from "../_actions/wishlist.action";

// Actions

export function useRemoveFromWishlist() {
  // translations
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (productId: string) => {
      const response = await removeFromWishlist(productId);

      if ("error" in response) {
        throw new Error(response.message || response.error || t("failed-to-remove-from-wishlist"));
      }

      return response;
    },
  });

  return { isPending, error, removeFromWishlist: mutate };
}
