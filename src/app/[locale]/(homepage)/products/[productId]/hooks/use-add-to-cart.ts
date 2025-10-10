// Libraries
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Actions
import { addToCartAction } from "../_actions/cart.actoin";

export function useAddToCart() {
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
      toast.success(`${data.numOfCartItems} items in your cart`);
    },
    onError: (error) => {
      toast.error(`Failed to add to cart ${error.message}`);
    },
  });

  return { isPending, error, addToCart: mutate };
}
