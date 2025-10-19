"use client";

import { BrushCleaning, MoveLeft } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import UserCartCardSkeleton from "@/components/skeletons/user-cart/cart-card.skeleton";
import useFetchCart from "../_hooks/use-fetch-cart";
import UserCartCard from "./user-cart-card";
import EmptyCart from "./empty-cart";
import useClearCart from "../_hooks/use-clear-card";

const CartSection = () => {
  // translations
  const t = useTranslations();
  const format = useFormatter();

  // router
  const router = useRouter();
  // hooks
  const { payload, isLoading } = useFetchCart();
  const { clearCartMutation, isPending } = useClearCart();

  // variables
  const items = payload?.cart?.cartItems ?? [];
  const itemsLength = items.length;

  return (
    <section className="space-y-6 col-span-2">
      {/* Cart Header */}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-baseline gap-2">
          <h2 className="text-3xl sm:text-5xl font-bold">
            {t("your-cart")}
            {itemsLength === 0 && t("is-empty")}
          </h2>
          <p className="font-medium self-end text-zinc-400 text-xs sm:text-sm md:text-base">
            {t("itemslength-items", { count: format.number(itemsLength, "number-base") })}
          </p>
        </div>
        {itemsLength > 0 && (
          <Button
            variant={"secondary"}
            className="flex w-full sm:w-auto items-center gap-2 rtl:flex-row-reverse"
            onClick={() => clearCartMutation()}
            disabled={isPending}
          >
            <BrushCleaning />
            {t("clear-cart")}
          </Button>
        )}
      </div>
      {/* Cart Items */}
      <div className="grid grid-cols-1 gap-4 border border-zinc-300 p-3 sm:p-5 rounded-md">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <UserCartCardSkeleton key={index} />
            ))}
          </div>
        ) : itemsLength === 0 ? (
          <EmptyCart />
        ) : (
          items.map((item) => {
            return <UserCartCard key={item._id} item={item} />;
          })
        )}
      </div>

      {/* Continue Shopping Button */}
      {itemsLength !== 0 && (
        <Button
          className="w-full sm:w-fit flex items-center gap-1 rtl:flex-row-reverse"
          onClick={() => router.back()}
        >
          <MoveLeft />
          {t("continue-shopping")}
        </Button>
      )}
    </section>
  );
};
export default CartSection;
