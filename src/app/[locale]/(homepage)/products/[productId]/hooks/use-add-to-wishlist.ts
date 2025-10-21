// Libraries
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddToWishlist } from "../_actions/wishlist.action";

export function useAddToWishlist() {
  // translations
  const t = useTranslations();

  // Query Client
  const queryClient = useQueryClient();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (productId: string) => {
      const response = await AddToWishlist(productId);

      if ("error" in response) {
        throw new Error(response.message || response.error || t("failed-to-add-to-wishlist"));
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  return { isPending, error, addToWishlist: mutate };
}
