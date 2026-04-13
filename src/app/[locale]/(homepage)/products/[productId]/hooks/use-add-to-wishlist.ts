// Libraries
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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

      if (!response.status) {
        throw new Error(response.message || response.error || t("failed-to-add-to-wishlist"));
      }
      return response;
    },
    onSuccess: () => {
      toast.success(t("added-to-wishlist"));
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["products-best-selling"] });
    },
    onError: (error: { message: string }) => {
      toast.error(`${t("failed-to-add-to-wishlist")} ${error.message}`);
    },
  });

  return { isPending, error, addToWishlist: mutate };
}
