"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import useFetchCart from "@/app/[locale]/(homepage)/cart/_hooks/use-fetch-cart";
import UserCartCard from "@/app/[locale]/(homepage)/cart/_components/user-cart-card";
import useClearCart from "@/app/[locale]/(homepage)/cart/_hooks/use-clear-card";
import EmptyCart from "@/app/[locale]/(homepage)/cart/_components/empty-cart";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import UserCartCardSkeleton from "../skeletons/user-cart/cart-card.skeleton";
import TooltipCom from "./tooltip-com";

const CartIcon = () => {
  // hooks
  const { payload, isLoading } = useFetchCart();
  const { clearCartMutation, isPending } = useClearCart();

  // translations
  const t = useTranslations();
  const format = useFormatter();

  // variables
  const count = payload?.numOfCartItems ?? 0;
  const totalPrice = payload?.cart?.totalPrice ?? 0;
  const items = payload?.cart?.cartItems ?? [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <TooltipCom
            title={t("open-cart")}
            icon={<ShoppingCart className="cursor-pointer size-6" />}
            isLoading={isLoading}
            count={count}
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="relative w-[min(90vw,500px)] h-[520px] rounded-2xl border p-0 bg-white dark:bg-zinc-900 shadow-lg">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 p-4 backdrop-blur bg-zinc-900">
          <h3 className="text-lg font-semibold text-white dark:text-zinc-300">
            {t("cart-items")} ({format.number(count, "number-base")})
          </h3>
          <div className="flex items-center gap-3 rtl:flex-row-reverse">
            <span className="text-sm text-white dark:text-zinc-300">{t("total")}</span>
            <span className="text-base text-white dark:text-zinc-300 font-medium">
              {format.number(totalPrice, "currency-int")}
            </span>
          </div>
          <Button
            variant="destructive"
            className="flex rtl:flex-row-reverse gap-1"
            onClick={() => clearCartMutation()}
            disabled={isPending || count === 0}
          >
            <Trash2 className="size-4" />
            {t("clear")}
          </Button>
        </div>
        <Separator />
        <ScrollArea className="h-[468px]">
          <section className="p-4">
            {isLoading ? (
              <UserCartCardSkeleton />
            ) : count === 0 ? (
              <EmptyCart />
            ) : (
              items.map((item) => (
                <div key={item._id} className="mb-3 last:mb-0">
                  <UserCartCard item={item} />
                </div>
              ))
            )}
          </section>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartIcon;
