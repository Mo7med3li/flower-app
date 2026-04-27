"use client";

import { Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { addToCartLocalStorage } from "@/app/[locale]/(homepage)/products/[productId]/_actions/local-cart.action";
import { useAddToCart } from "@/app/[locale]/(homepage)/products/[productId]/hooks/use-add-to-cart";
import { Button } from "../ui/button";
import { useCheckUserStatus } from "../providers/components/check-user-status.provider";

const ProductCardCart = ({ productId }: { productId: string }) => {
  // hooks
  const { isPending, addToCart } = useAddToCart();
  const { isAuthenticated } = useCheckUserStatus();
  const t = useTranslations();

  // functions
  const handleClick = async () => {
    if (!isAuthenticated) {
      try {
        addToCartLocalStorage(productId, 1);

        toast.success(t("added-to-cart"));
      } catch (error) {
        toast.error(`${t("failed-to-add-to-cart")} ${error}`);
      }

      return;
    }

    addToCart({ productId, quantity: 1 });
  };
  return (
    <Button
      className="rounded-full [&_svg]:size-6 h-11 w-11 bg-maroon-600 hover:bg-maroon-700 dark:bg-maroon-500 dark:text-white"
      size="icon"
      aria-label="Add to cart"
      onClick={handleClick}
    >
      {isPending ? <Loader2 className="animate-spin" /> : <ShoppingCart strokeWidth={1} />}
    </Button>
  );
};

export default ProductCardCart;
