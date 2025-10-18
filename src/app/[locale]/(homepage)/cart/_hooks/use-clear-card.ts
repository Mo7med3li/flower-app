import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import clearCart from "../_actions/clear-cart";

const useClearCart = () => {
  // translations
  const t = useTranslations();

  // query
  const queryClient = useQueryClient();

  // mutation
  const { mutate: clearCartMutation, isPending } = useMutation({
    mutationFn: async () => await clearCart(),
    mutationKey: ["clear-cart"],
    onSuccess: () => {
      toast.success(t("cart-cleared"));
      queryClient.invalidateQueries({
        queryKey: ["user-cart"],
      });
    },
    onError: (e) => {
      toast.error(e.message || t("failed-to-clear-cart"));
    },
  });
  return { clearCartMutation, isPending };
};
export default useClearCart;
