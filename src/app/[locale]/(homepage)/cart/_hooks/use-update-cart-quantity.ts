import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import updateCartQuantity from "../_actions/update-cart-quantity.action";

const useUpdateCartQuantity = ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  // translations
  const t = useTranslations();
  // query
  const queryClient = useQueryClient();
  // mutation
  const { mutate: updateCartQuantityMutation, isPending } = useMutation({
    mutationFn: async () => await updateCartQuantity(productId, quantity),
    mutationKey: ["update-cart-quantity"],
    onSuccess: () => {
      toast.success(t("cart-updated-successfully"));
    },
    onError: (e) => {
      toast.error(e.message || t("failed-update-cart"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-cart"],
      });
    },
  });
  return { updateCartQuantityMutation, isPending };
};
export default useUpdateCartQuantity;
