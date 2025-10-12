"use client";

import { useState } from "react";
import { Heart, HeartPlus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAddToWishlist } from "../hooks/use-add-to-wishlist";
import { useRemoveFromWishlist } from "../hooks/use-delete-from-wishlist";

interface WishlistCheckResult {
  inWishlist: boolean;
}

interface AddToWishlistProps {
  productId: string;
  check: APIResponse<WishlistCheckResult>;
  extend?: boolean;
  animation?: boolean;
}
export default function FavoriteToggle({
  productId,
  check,
  extend,
  animation,
}: AddToWishlistProps) {
  const [isFavorite, setIsFavorite] = useState("inWishlist" in check ? check.inWishlist : false);

  const { isPending: isAdding, addToWishlist } = useAddToWishlist();
  const { isPending: isRemoving, removeFromWishlist } = useRemoveFromWishlist();

  const handleClick = () => {
    if ("error" in check) {
      toast.error("Please login to manage your wishlist.");
      return;
    }

    const newStatus = !isFavorite;

    if (newStatus) {
      // Add to wishlist
      addToWishlist(productId, {
        onSuccess: () => {
          setIsFavorite(true);
          toast.success("Added to wishlist!");
        },
        onError: (error: { message: string }) => {
          toast.error(`Failed to add to wishlist ${error.message}`);
        },
      });
    } else {
      // Remove from wishlist
      removeFromWishlist(productId, {
        onSuccess: () => {
          setIsFavorite(false);
          toast.success("Removed from wishlist!");
        },
        onError: (error: { message: string }) => {
          toast.error(`Failed to remove from wishlist ${error.message}`);
        },
      });
    }
  };

  const isPending = isAdding || isRemoving;

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label="Toggle Wishlist"
      className={cn(
        "group w-full flex items-center justify-center dark:border-2 border-zinc-500 rounded-lg p-3 h-12 transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isFavorite
          ? "bg-red-100 hover:bg-red-200"
          : "bg-zinc-100 dark:bg-soft-pink-300 dark:hover:bg-soft-pink-600 hover:bg-zinc-200",
      )}
    >
      {/* Icon */}
      {isFavorite ? (
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
          {isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        </span>
      )}
    </button>
  );
}
