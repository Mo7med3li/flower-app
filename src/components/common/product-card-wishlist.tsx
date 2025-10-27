"use client";

import { Heart, HeartPlus, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAddToWishlist } from "@/app/[locale]/(homepage)/products/[productId]/hooks/use-add-to-wishlist";
import { useRemoveFromWishlist } from "@/app/[locale]/(homepage)/products/[productId]/hooks/use-delete-from-wishlist";
import { useCheckWishlist } from "@/app/[locale]/(homepage)/products/[productId]/hooks/use-check-wishlist";
import { Badge } from "../ui/badge";

const ProductCardWishlist = ({ productId }: { productId: string }) => {
  // Translations
  const t = useTranslations();

  // Hooks
  const { addToWishlist, isPending } = useAddToWishlist();
  const { data, isLoading } = useCheckWishlist(productId);
  const { isPending: isRemoving, removeFromWishlist } = useRemoveFromWishlist();

  return (
    <Badge
      className="dark:text-soft-pink-100 group text-maroon-600 flex items-center gap-1 cursor-pointer bg-white py-1 px-2 hover:bg-maroon-50"
      onClick={() => {
        if (data?.isInWishlist) {
          removeFromWishlist(productId);
        } else {
          addToWishlist(productId);
        }
      }}
    >
      {isPending || isLoading || isRemoving ? (
        <>
          <Loader2 className="animate-spin" />
        </>
      ) : (
        <>
          {data?.isInWishlist ? <Heart size={20} fill="red" /> : <HeartPlus size={20} />}
          <span className="font-medium text-xs hidden transition-all duration-500 group-hover:block">
            {data?.isInWishlist ? t("remove-from-wishlist") : t("add-to-wishlist")}
          </span>
        </>
      )}
    </Badge>
  );
};

export default ProductCardWishlist;
