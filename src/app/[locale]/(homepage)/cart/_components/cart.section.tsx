"use client";

import { BrushCleaning, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import UserCartCardSkeleton from "@/components/skeletons/user-cart/cart-card.skeleton";
import useFetchCart from "../_hooks/use-fetch-cart";
import UserCartCard from "./user-cart-card";
import EmptyCart from "./empty-cart";

const CartSection = () => {
  const router = useRouter();
  // hooks
  const { payload, isLoading } = useFetchCart();

  // variables
  const items = payload?.cart?.cartItems ?? [];
  const itemsLength = items.length;

  return (
    <section className="space-y-6">
      {/* Cart Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-[10px]">
          <h2 className="text-5xl font-bold">Your Cart {itemsLength === 0 && "is empty"}</h2>
          <p className="font-medium self-end text-zinc-400">{itemsLength} items</p>
        </div>
        {itemsLength > 0 && (
          <Button variant={"secondary"} className="flex items-center gap-2">
            <BrushCleaning />
            Clear Cart
          </Button>
        )}
      </div>
      {/* Cart Items */}
      <div className="grid grid-cols-1 gap-4 border border-zinc-300 p-5 rounded-md">
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
      <Button className="w-fit" onClick={() => router.back()}>
        <MoveLeft />
        Continue Shopping
      </Button>
    </section>
  );
};
export default CartSection;
