// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
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
      if (!response.status) {
        throw new Error(response.message || t("failed-to-remove-from-wishlist"));
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["products-best-selling"] });
      toast.success(t("removed-from-wishlist"));
    },
    onError: () => {
      toast.error(t("failed-to-remove-from-wishlist"));
    },
  });

  return { isPending, error, removeFromWishlist: mutate };
}
