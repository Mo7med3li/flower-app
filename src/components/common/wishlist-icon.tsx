"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFetchWishlist } from "@/hooks/wishlist/use-fetch-wishlist";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import WishlistSkeleton from "../skeletons/wishlist/wishlist.skeleton";
import TooltipCom from "./tooltip-com";

const WishlistIcon = () => {
  // translations
  const t = useTranslations();

  // hooks
  const { payload, isLoading, error } = useFetchWishlist();

  // variables
  const count = payload?.count ?? 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <TooltipCom
            title={t("open-wishlist")}
            icon={<Heart className="cursor-pointer size-6" />}
            isLoading={isLoading}
            count={count}
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="relative w-[min(90vw,500px)] h-[520px] rounded-2xl border p-0 bg-white dark:bg-zinc-900 shadow-lg">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60">
          <h3 className="text-lg font-semibold">Wishlist ({count})</h3>
          <div className="text-sm text-zinc-600 dark:text-zinc-300">Total items</div>
        </div>
        <Separator />
        <ScrollArea className="h-[468px]">
          <section className="p-4">
            {isLoading ? (
              <WishlistSkeleton />
            ) : count === 0 || error ? (
              <div className="flex h-64 flex-col items-center justify-center text-center text-sm text-zinc-500 dark:text-zinc-400">
                <Heart className="mb-3 size-8" />
                Your wishlist is empty
              </div>
            ) : (
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Wishlist items coming soon
              </div>
            )}
          </section>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WishlistIcon;
