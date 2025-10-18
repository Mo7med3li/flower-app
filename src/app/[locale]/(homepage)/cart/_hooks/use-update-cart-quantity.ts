import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import updateCartQuantity from "../_actions/update-cart-quantity.action";

const useUpdateCartQuantity = ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  // query
  const queryClient = useQueryClient();
  // mutation
  const { mutate: updateCartQuantityMutation, isPending } = useMutation({
    mutationFn: async () => await updateCartQuantity(productId, quantity),
    mutationKey: ["update-cart-quantity"],
    onSuccess: () => {
      toast.success("Cart updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["user-cart"],
      });
    },
    onError: (e) => {
      toast.error(e.message || "Failed to update cart quantity");
    },
  });
  return { updateCartQuantityMutation, isPending };
};
export default useUpdateCartQuantity;
