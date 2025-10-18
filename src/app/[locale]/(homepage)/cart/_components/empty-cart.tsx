import { MoveLeft, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const EmptyCart = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-zinc-600">
      <div className="flex items-center justify-center rounded-full bg-zinc-100 p-4">
        <ShoppingCart className="size-10 text-zinc-500" />
      </div>
      <p className="text-2xl font-semibold text-zinc-800">Your cart is empty</p>
      <p className="max-w-md text-sm text-zinc-500">
        Looks like you haven’t added any items yet. Explore our products and add your favorites to
        the cart.
      </p>
      <Button className="mt-2" onClick={() => router.back()}>
        <MoveLeft />
        Continue Shopping
      </Button>
    </div>
  );
};
export default EmptyCart;
