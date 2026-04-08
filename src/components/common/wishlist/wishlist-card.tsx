import { Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useFormatter } from "next-intl";
import { Trash2 } from "lucide-react";
import { Product } from "@/lib/types/products";
import { useRemoveFromWishlist } from "@/app/[locale]/(homepage)/products/[productId]/hooks/use-delete-from-wishlist";
import { Button } from "../../ui/button";
interface WishlistCardProps {
  product: {
    id: string;
    productId: string;
    userId: string;
    product: Product;
  };
}

const WishlistCard = ({ product }: WishlistCardProps) => {
  const { product: productData } = product;
  // translations
  const t = useTranslations();
  const format = useFormatter();
  const { removeFromWishlist, isPending } = useRemoveFromWishlist();

  return (
    <div className="mb-3 last:mb-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b dark:border-zinc-800 pb-4">
      <div className="relative overflow-hidden rounded-lg w-24 h-24 sm:w-28 sm:h-28">
        <Image
          alt={productData.title}
          src={productData.cover}
          className="object-cover object-center w-full h-full"
          width={112}
          height={112}
          sizes="(max-width: 640px) 96px, 112px"
        />
      </div>
      <div className="flex flex-1 w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-maroon-700 dark:text-maroon-200">
            {productData.title}
          </h2>
          <p className="flex items-center rtl:flex-row-reverse w-fit gap-2 font-medium text-zinc-950 dark:text-zinc-200">
            <Star className="size-5 fill-yellow-500 stroke-yellow-500" /> {t("rating")}{" "}
            {format.number(productData.rateAvg ?? 0, "number-base")}/
            {format.number(5, "number-base")}{" "}
            <span className="text-blue-600">
              ({format.number(productData.rateCount ?? 0, "number-base")} {t("ratings-1")})
            </span>
          </p>
          <p className="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-zinc-200">
            {format.number(productData.price, "currency-int")}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:self-start">
          <Button
            variant="destructive"
            className="w-full sm:w-auto flex rtl:flex-row-reverse gap-1"
            onClick={() => removeFromWishlist(product.id)}
            disabled={isPending}
          >
            <Trash2 className="size-4" />
            {t("remove")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
