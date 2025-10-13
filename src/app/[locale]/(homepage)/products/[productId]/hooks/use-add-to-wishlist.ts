// Libraries
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { AddToWishlist } from "../_actions/wishlist.action";

export function useAddToWishlist() {
  // translations
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (productId: string) => {
      const response = await AddToWishlist(productId);

      if ("error" in response) {
        throw new Error(response.message || response.error || t("failed-to-add-to-wishlist"));
      }
      return response;
    },
  });

  return { isPending, error, addToWishlist: mutate };
}
