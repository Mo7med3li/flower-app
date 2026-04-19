"use client";

import { Heart } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { useFetchWishlist } from "@/hooks/wishlist/use-fetch-wishlist";
import { Product } from "@/lib/types/products";
import WishlistSkeleton from "../../skeletons/wishlist/wishlist.skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { ScrollArea } from "../../ui/scroll-area";
import { Separator } from "../../ui/separator";
import TooltipCom from "../tooltip-com";
import WishlistCard from "./wishlist-card";

import EmptyWishlist from "./empty-wishlist";

const WishlistIcon = () => {
  // translations
  const t = useTranslations();
  const format = useFormatter();

  // hooks
  const { payload, isLoading, error } = useFetchWishlist();

  // variables
  const count = payload?.wishlistItems?.length ?? 0;
  const products = payload?.wishlistItems ?? [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label={t("open-wishlist")} className="relative outline-none">
          <TooltipCom
            title={t("open-wishlist")}
            icon={<Heart className="cursor-pointer size-6" />}
            isLoading={isLoading}
            count={count}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="relative w-[min(90vw,500px)] hide-scroll h-[400px] rounded-2xl border p-0 bg-white dark:bg-zinc-900 shadow-lg">
        <div className="sticky top-0 z-10 flex items-center justify-center gap-4 backdrop-blur bg-maroon-700 dark:bg-soft-pink-200 p-4 rounded-t-lg">
          <h3 className="text-xl text-white  dark:text-zinc-800 font-bold">
            {t("wishlist")} ({format.number(count, "number-base")})
          </h3>
        </div>
        <Separator />
        <ScrollArea className="hide-scroll">
          <section className="p-4">
            {isLoading ? (
              <WishlistSkeleton />
            ) : count === 0 || error ? (
              <EmptyWishlist />
            ) : (
              products.map((item: Product) => <WishlistCard key={item.id} product={item} />)
            )}
          </section>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WishlistIcon;
