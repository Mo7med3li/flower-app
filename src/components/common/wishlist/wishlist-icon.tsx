"use client";

import { Heart, Loader2, Trash2 } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import useClearWishlist from "@/hooks/wishlist/use-clear-wishlist";
import { useFetchWishlist } from "@/hooks/wishlist/use-fetch-wishlist";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Separator } from "../../ui/separator";
import { ScrollArea } from "../../ui/scroll-area";
import WishlistSkeleton from "../../skeletons/wishlist/wishlist.skeleton";
import TooltipCom from "../tooltip-com";
import WishlistCard from "./wishlist-card";
import { Button } from "../../ui/button";

import EmptyWishlist from "./empty-wishlist";

const WishlistIcon = () => {
  // translations
  const t = useTranslations();
  const format = useFormatter();

  // hooks
  const { payload, isLoading, error } = useFetchWishlist();
  const { clearWishlistMutation, isPending } = useClearWishlist();

  // variables
  const count = payload?.count ?? 0;
  const products = payload?.wishlist?.products ?? [];

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

      <DropdownMenuContent className="relative w-[min(90vw,500px)] hide-scroll h-[400px] rounded-2xl border p-0 bg-white dark:bg-zinc-900 shadow-lg">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 backdrop-blur bg-maroon-700 dark:bg-soft-pink-200 p-4 rounded-t-lg">
          <h3 className="text-xl text-white dark:text-zinc-800 font-bold">
            {t("wishlist")} ({format.number(count, "number-base")})
          </h3>
          <Button
            onClick={() => clearWishlistMutation()}
            variant={"secondary"}
            disabled={isPending || count === 0}
          >
            {isPending ? (
              <Loader2 className="size-4" />
            ) : (
              <>
                <Trash2 className="size-4" />
                {t("clear-wishlist")}
              </>
            )}
          </Button>
        </div>
        <Separator />
        <ScrollArea className="hide-scroll">
          <section className="p-4">
            {isLoading ? (
              <WishlistSkeleton />
            ) : count === 0 || error ? (
              <EmptyWishlist />
            ) : (
              products.map((product) => <WishlistCard key={product.id} product={product} />)
            )}
          </section>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WishlistIcon;
