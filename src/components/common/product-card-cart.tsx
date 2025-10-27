"use client";

import { Loader2, ShoppingCart } from "lucide-react";
import { useAddToCart } from "@/app/[locale]/(homepage)/products/[productId]/hooks/use-add-to-cart";
import { Button } from "../ui/button";

const ProductCardCart = ({ productId }: { productId: string }) => {
  // hooks
  const { isPending, addToCart } = useAddToCart();

  // functions
  const handleClick = () => {
    addToCart({ productId, quantity: 1 });
  };
  return (
    <Button
      className="rounded-full [&_svg]:size-6 h-11 w-11 bg-maroon-600 hover:bg-maroon-700 dark:bg-maroon-500 dark:text-white"
      size="icon"
      onClick={handleClick}
    >
      {isPending ? <Loader2 className="animate-spin" /> : <ShoppingCart strokeWidth={1} />}
    </Button>
  );
};

export default ProductCardCart;
