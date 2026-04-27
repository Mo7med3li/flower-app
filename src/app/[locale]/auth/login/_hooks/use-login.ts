import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { LoginFields } from "@/lib/schemas/auth.schema";
import { getCart } from "@/app/[locale]/(homepage)/products/[productId]/_actions/local-cart.action";
import { useAddToCart } from "@/app/[locale]/(homepage)/products/[productId]/hooks/use-add-to-cart";

export default function useLogin() {
  const { addToCartAsync } = useAddToCart();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const queryClient = useQueryClient();
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ username, password }: LoginFields) => {
      const response = await signIn("credentials", {
        username,
        password,
        redirect: false,
        callbackUrl: decodeURIComponent(searchParams.get("callbackUrl") || "/"),
      });

      if (response?.error) throw new Error(response.error);

      return response;
    },
    onSuccess: async () => {
      toast.success(t("login-successful-welcome"));

      // 1. Get the local cart
      const localCart = getCart();

      // 2. Check if they have items to sync
      if (localCart && localCart.items.length > 0) {
        try {
          // 3. Send items to backend sequentially to avoid race conditions
          for (const item of localCart.items) {
            await addToCartAsync({ productId: item.productId, quantity: item.quantity });
          }

          localStorage.removeItem("elevate-flower-cart");

          // 5. Invalidate the react-query cart so the UI updates
          queryClient.invalidateQueries({ queryKey: ["user-cart"] });
        } catch (error) {
          console.error("Failed to sync cart", error);
          toast.error(t("failed-to-sync-cart"));
        }
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return { isPending, error, login: mutate };
}
