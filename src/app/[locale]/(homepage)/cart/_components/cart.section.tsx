"use client";

import { BrushCleaning, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import useFetchCart from "../_hooks/use-fetch-cart";
import UserCartCard from "./user-cart-card";

const CartSection = () => {
  const router = useRouter();
  // Hooks
  const { payload, isLoading } = useFetchCart();

  //   Loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="space-y-6">
      {/* Cart Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-[10px]">
          <h2 className="text-5xl font-bold">Your Cart</h2>
          <p className="font-medium self-end text-zinc-400">
            {payload?.cart.cartItems.length} items
          </p>
        </div>
        <Button variant={"secondary"} className="flex items-center gap-2">
          <BrushCleaning />
          Clear Cart
        </Button>
      </div>
      {/* Cart Items */}
      <div className="grid grid-cols-1 gap-4 border border-zinc-300 p-5 rounded-md">
        {payload?.cart.cartItems.map((item) => {
          return <UserCartCard key={item._id} item={item} />;
        })}
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
