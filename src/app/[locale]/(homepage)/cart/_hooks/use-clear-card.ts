import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import clearCart from "../_actions/clear-cart";

const useClearCart = () => {
  // query
  const queryClient = useQueryClient();

  // mutation
  const { mutate: clearCartMutation, isPending } = useMutation({
    mutationFn: async () => await clearCart(),
    mutationKey: ["clear-cart"],
    onSuccess: () => {
      toast.success("Cart cleared successfully");
      queryClient.invalidateQueries({
        queryKey: ["user-cart"],
      });
    },
    onError: (e) => {
      toast.error(e.message || "Failed to clear cart");
    },
  });
  return { clearCartMutation, isPending };
};
export default useClearCart;
