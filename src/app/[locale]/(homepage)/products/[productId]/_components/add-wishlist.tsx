"use client";

import { Heart, HeartPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchWishlist } from "@/hooks/wishlist/use-fetch-wishlist";
import { useAddToWishlist } from "../hooks/use-add-to-wishlist";
import { useRemoveFromWishlist } from "../hooks/use-delete-from-wishlist";

interface AddToWishlistProps {
  productId: string;

  extend?: boolean;
  animation?: boolean;
  isInWishlist: boolean;
}
export default function FavoriteToggle({
  productId,
  isInWishlist,
  extend,
  animation,
}: AddToWishlistProps) {
  // hooks
  const { isPending: isAdding, addToWishlist } = useAddToWishlist();
  const { isPending: isRemoving, removeFromWishlist } = useRemoveFromWishlist();
  const { payload, isLoading } = useFetchWishlist();
  const products = payload?.wishlistItems ?? [];

  const productInWishlist = products.find((item) => item.productId === productId);

  // translations
  const t = useTranslations();

  // functions
  const handleClick = () => {
    if (!isInWishlist) {
      // Add to wishlist
      addToWishlist(productId);
    } else {
      // Remove from wishlist
      removeFromWishlist(productInWishlist?.id || "");
    }
  };
  if (isAdding || isRemoving || isLoading) return <Skeleton className="w-12 h-12" />;

  const isPending = isAdding || isRemoving;

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label="Toggle Wishlist"
      className={cn(
        "group w-full flex items-center justify-center dark:border-2 border-zinc-500 rounded-lg p-3 h-12 transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isInWishlist
          ? "bg-red-100 hover:bg-red-200"
          : "bg-zinc-100 dark:bg-soft-pink-300 dark:hover:bg-soft-pink-600 hover:bg-zinc-200",
      )}
    >
      {/* Icon */}
      {isInWishlist ? (
        <Heart className={cn("w-6 h-6 fill-red-500 text-red-500", isPending && "animate-pulse")} />
      ) : (
        <HeartPlus className={cn("w-6 h-6 text-zinc-800", isPending && "animate-pulse")} />
      )}

      {/* Conditional text */}
      {extend && (
        <span
          className={cn(
            "text-sm font-medium text-zinc-800 transition-all duration-300",
            animation
              ? "overflow-hidden whitespace-nowrap max-w-0 opacity-0 group-hover:ml-2 group-hover:max-w-[200px] group-hover:opacity-100"
              : "ml-2 opacity-100",
          )}
        >
          {isInWishlist ? t("remove-from-wishlist") : t("add-to-wishlist")}
        </span>
      )}
    </button>
  );
}
