"use client";

import Image from "next/image";
import { Minus, Plus, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useFormatter, useTranslations } from "next-intl";
import { CartItem } from "@/lib/types/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUpdateCartQuantity from "../_hooks/use-update-cart-quantity";
import useDeleteItemCart from "../_hooks/use-delete-item-cart";

const UserCartCard = ({ item }: { item: CartItem }) => {
  const { product, quantity: itemQuantity } = item;
  // transition
  const t = useTranslations();
  const format = useFormatter();

  // states
  const [quantity, setQuantity] = useState(itemQuantity);

  // debounced quantity
  const [debouncedQuantity] = useDebounce(quantity, 400);

  // hooks
  const { updateCartQuantityMutation, isPending } = useUpdateCartQuantity({
    productId: item.id,
    quantity: debouncedQuantity,
  });

  const { removeProductCartMutation, isPending: isRemovePending } = useDeleteItemCart({
    cartItemId: item.id,
  });

  // effects
  useEffect(() => {
    if (debouncedQuantity !== item.quantity) {
      updateCartQuantityMutation();
    }
  }, [debouncedQuantity, item.quantity, updateCartQuantityMutation]);
  return (
    <div
      key={item.id}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b dark:border-zinc-900 pb-5"
    >
      {/* Product image */}
      <div className="relative overflow-hidden rounded-lg w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
        {/* Discount Badge */}
        {product.discountType && product.discountValue > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            {product.discountType === "PERCENT"
              ? `-${product.discountValue}%`
              : `-${format.number(product.discountValue, "currency-int")}`}
          </div>
        )}
        <Image
          alt="Product image"
          src={product.cover}
          className="object-cover object-center w-full h-full"
          width={128}
          height={128}
          sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
        />
      </div>
      <div className="flex flex-col gap-4 w-full h-full justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {/* Product name */}
            <h2 className="text-base sm:text-lg font-semibold text-maroon-700 dark:text-maroon-200">
              {product.title}
            </h2>

            {/* Product rating */}
            <p className="flex items-center rtl:flex-row-reverse w-fit gap-2 font-medium text-zinc-950 dark:text-zinc-200">
              <Star className="size-5 fill-yellow-500 stroke-yellow-500" /> {t("rating")}{" "}
              {format.number(product.rating, "number-base")}/{format.number(5, "number-base")}{" "}
              <span className="text-blue-600">
                ({format.number(product.ratings, "number-base")} {t("ratings-1")})
              </span>
            </p>
          </div>
          {/* Remove product */}
          <Button
            variant="destructive"
            className="w-full sm:w-fit flex rtl:flex-row-reverse gap-1"
            onClick={() => removeProductCartMutation()}
            disabled={isRemovePending}
          >
            <Trash2 className="size-5" />
            {t("remove")}
          </Button>
        </div>

        {/* Product details */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {/* Product Price | Product Quantity*/}
            <p className="flex-1 flex items-center gap-1 text-xl sm:text-2xl font-bold text-zinc-800 dark:text-zinc-200">
              <span className="text-xs sm:text-sm font-medium text-maroon-500 dark:text-maroon-100">
                (x{format.number(item.quantity, "number-base")})
              </span>
              <div className="flex flex-col">
                {product.discountType && product.discountValue > 0 ? (
                  <>
                    <span className="text-sm text-zinc-500 line-through decoration-zinc-500">
                      {format.number(product.price * item.quantity, "currency-int")}
                    </span>
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      {format.number(
                        product.discountType === "PERCENT"
                          ? product.price * item.quantity * (1 - product.discountValue / 100)
                          : (product.price - product.discountValue) * item.quantity,
                        "currency-int",
                      )}
                    </span>
                  </>
                ) : (
                  <span>{format.number(product.price * item.quantity, "currency-int")}</span>
                )}
              </div>
            </p>
          </div>

          {/* Product price / Quantity / add-remove product */}
          <div className="flex items-center justify-between sm:justify-end">
            {/* Add remove product from the cart */}
            <div className="flex w-full items-center rtl:flex-row-reverse gap-2">
              <Button
                variant="secondary"
                className="size-10 p-3 flex-1 sm:size-12 sm:p-4 dark:disabled:bg-zinc-900"
                onClick={() => {
                  setQuantity((prev) => Math.max(1, prev - 1));
                }}
                disabled={isPending || quantity === 1}
              >
                <Minus />
              </Button>
              <Input
                type="number"
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val > 0) setQuantity(val);
                }}
                placeholder={format.number(item.quantity, "number-base")}
                value={quantity}
                className="h-10 sm:h-12 max-w-24 sm:max-w-28 p-3 sm:p-4 flex-1"
              />
              <Button
                variant="secondary"
                className="size-10 p-3 flex-1 sm:size-12 sm:p-4"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
                disabled={isPending}
              >
                <Plus />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCartCard;
