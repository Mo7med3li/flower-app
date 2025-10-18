import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import removeProductCart from "../_actions/remove-product-cart";

const useDeleteItemCart = ({ cartItemId }: { cartItemId: string }) => {
  // query
  const queryClient = useQueryClient();

  // mutation
  const { mutate: removeProductCartMutation, isPending } = useMutation({
    mutationFn: async () => await removeProductCart(cartItemId),
    mutationKey: ["remove-product-cart"],
    onSuccess: () => {
      toast.success("Product removed from cart successfully");
      queryClient.invalidateQueries({
        queryKey: ["user-cart"],
      });
    },
    onError: (e) => {
      toast.error(e.message || "Failed to remove product from cart");
    },
  });
  return { removeProductCartMutation, isPending };
};
export default useDeleteItemCart;
