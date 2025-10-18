// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useFormatter, useTranslations } from "next-intl";
// Actions
import { addToCartAction } from "../_actions/cart.action";

export function useAddToCart() {
  // translations
  const t = useTranslations();
  const format = useFormatter();
  const queryClient = useQueryClient();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
      const response = await addToCartAction(productId, quantity);

      if ("error" in response) {
        throw new Error(response.message || response.error);
      }
      return response;
    },
    onSuccess: (data) => {
      toast.success(
        `${format.number(data.numOfCartItems, "number-base")} ${t("items-in-your-cart")}`,
      );
      queryClient.invalidateQueries({ queryKey: ["user-cart"] });
    },
    onError: (error) => {
      toast.error(`${t("failed-to-add-to-cart")} ${error.message}`);
    },
  });

  return { isPending, error, addToCart: mutate };
}
