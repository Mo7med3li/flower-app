import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import removeProductCart from "../_actions/remove-product-cart";

const useDeleteItemCart = ({ cartItemId }: { cartItemId: string }) => {
  // translations
  const t = useTranslations();

  // query
  const queryClient = useQueryClient();

  // mutation
  const { mutate: removeProductCartMutation, isPending } = useMutation({
    mutationFn: async () => await removeProductCart(cartItemId),
    mutationKey: ["remove-product-cart"],
    onSuccess: () => {
      toast.success(t("removed-cart-successfully"));
    },
    onError: (e) => {
      toast.error(e.message || t("failed-remove-cart"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-cart"],
      });
      queryClient.invalidateQueries({ queryKey: ["products-best-selling"] });
    },
  });
  return { removeProductCartMutation, isPending };
};
export default useDeleteItemCart;
