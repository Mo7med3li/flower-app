"use client";
import Image from "next/image";
import { Minus, Plus, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { CartItem } from "@/lib/types/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UserCartCard = ({ item }: { item: CartItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  return (
    <div key={item._id} className="flex items-center gap-4 border-b pb-5">
      {/* Product image */}

      <div className="relative overflow-hidden rounded-lg">
        <Image
          alt="Product image"
          src={item.product.imgCover}
          className="object-cover object-center"
          width={120}
          height={120}
        />
      </div>
      <div className="flex flex-col gap-4 w-full h-full justify-between">
        <div className="flex justify-between">
          <div>
            {/* Product name */}
            <h2 className="text-lg font-semibold text-maroon-700">{item.product.title}</h2>

            {/* Product rating */}
            <p className="flex items-center gap-1 font-medium text-zinc-950">
              <Star className="size-5 fill-yellow-500 stroke-yellow-500" /> Rating:{" "}
              {item.product.rateAvg}/5{" "}
              <span className="text-blue-600">({item.product.rateCount} Ratings)</span>
            </p>
          </div>
          {/* Remove product */}
          <Button variant="destructive" className="w-fit">
            <Trash2 className="size-5" />
            Remove
          </Button>
        </div>

        {/* Product details */}
        <div className="flex justify-between items-center">
          <div className="self-end">
            {/* Product Price | Product Quantity*/}
            <p className="flex-1 text-2xl font-bold text-zinc-800">
              <span className="text-sm font-medium text-maroon-500">(x1)</span>{" "}
              <span>{item.product.price}</span> <span className="text-base font-medium">EGP</span>
            </p>
          </div>

          {/* Product price / Quantity / add-remove product */}
          <div className="flex items-end justify-between">
            {/* Add remove product from the cart */}
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                className="size-12 p-4"
                onClick={() => setQuantity(quantity - 1)}
              >
                <Minus />
              </Button>
              <Input
                onChange={(e) => setQuantity(Number(e.target.value))}
                type="number"
                placeholder={item.quantity.toString()}
                value={quantity}
                className="h-12 max-w-28 p-4"
              />
              <Button
                variant="secondary"
                className="size-12 p-4"
                onClick={() => setQuantity(quantity + 1)}
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
