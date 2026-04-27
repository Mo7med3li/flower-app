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
  const { isPending, error, mutate, mutateAsync } = useMutation({
    mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
      const response = await addToCartAction(productId, quantity);

      if (!response.status) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: (data) => {
      const successData = data as unknown as { payload: { cartItem: { quantity: number } } };
      toast.success(
        `${format.number(successData.payload?.cartItem?.quantity || 0, "number-base")} ${t("items-in-your-cart")}`,
      );
      queryClient.invalidateQueries({ queryKey: ["user-cart"] });
      queryClient.invalidateQueries({ queryKey: ["products-best-selling"] });
    },
    onError: (error) => {
      toast.error(`${t("failed-to-add-to-cart")} ${error.message}`);
    },
  });

  return { isPending, error, addToCart: mutate, addToCartAsync: mutateAsync };
}
