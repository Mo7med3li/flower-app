import Image from "next/image";
import { Star } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import type { Product } from "@/lib/types/products";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import { Link } from "@/i18n/navigation";
import ProductCardWishlist from "./product-card-wishlist";
import ProductCardCart from "./product-card-cart";
/**
 * SingleProduct Component
 *
 * Displays a single product card including:
 * - Cover image
 * - Sliced title (max 3 words)
 * - Rating stars
 * - Price and discounted price
 * - Cart button
 * - Conditional badges: NEW, HOT, OUT OF STOCK
 *
 * Props:
 * - singleProduct: Pass Single Product (contains details like title, image, price, rateAvg, quantity, sold, createdAt)
 */

// Params Single Product Type
// eslint-disable-next-line no-unused-vars
interface SingleProduct {
  singleProduct: Product;
}

export default function SingleProduct({ singleProduct }: SingleProduct) {
  // Variables
  let title;

  // Translations
  const format = useFormatter();
  const t = useTranslations();

  // Dates
  const currentDate = Date.now();
  const productDate = new Date(singleProduct.createdAt).getTime();
  const difference = currentDate - productDate;
  const durationInDays = Math.floor(difference / 1000 / 60 / 60 / 24); // Making Time By Day Instead Of Api Format

  // Functions
  // Slice Title
  const titleSliced = () => {
    if (singleProduct.title.split(" ").length > 3) {
      title = singleProduct.title.split(" ").slice(0, 3).join(" ") + "...";
    } else {
      title = singleProduct.title;
    }
    return title;
  };

  // Show New Badge
  const showNew = () => {
    if (durationInDays > 181) {
      return true;
    } else {
      return false;
    }
  };

  // Show Hot Badge
  const showHot = () => {
    if (singleProduct.ratings > 100) {
      return true;
    } else {
      return false;
    }
  };

  // Show Out Of Stock Badge
  const showOutOfStock = () => {
    if (singleProduct.stock === 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="relative flex flex-col">
      {/* Cover & title */}
      <div>
        {/* Product cover */}
        <Link href={`/products/${singleProduct.id}`}>
          <Image
            src={singleProduct.cover}
            width={302}
            height={0}
            style={{ objectFit: "cover" }}
            alt={singleProduct.title}
            className="h-72 w-full rounded-xl"
          />
        </Link>

        {/* product title */}
        <h3 className="text-lg mt-4 mb-1 font-semibold text-maroon-600 dark:text-soft-pink-200">
          {titleSliced()}
        </h3>
      </div>

      {/* Product description */}
      <div>
        {/* Price , Review & Cart button*/}
        <div className="flex justify-between font-medium">
          <div>
            {/* Review */}
            <div className="flex mb-1">
              {Array.from({ length: 5 }, (_, i) =>
                i < singleProduct.rating ? (
                  <Star fill="#FBA707" size={16} strokeWidth={0} key={i} />
                ) : (
                  <Star color="#FBA707" size={16} key={i} />
                ),
              )}
            </div>

            {/* Price */}
            <span className="text-maroon-600 dark:text-soft-pink-200 me-1">
              {format.number(
                singleProduct.discountType === "percentage"
                  ? singleProduct.price - (singleProduct.price * singleProduct.discountValue) / 100
                  : singleProduct.price - singleProduct.discountValue,
                "currency-float",
              )}
            </span>
            <span className="line-through text-zinc-400">
              {format.number(singleProduct.price, "currency-float")}
            </span>
          </div>

          {/* Cart Button */}
          <ProductCardCart productId={singleProduct.id} />
        </div>
      </div>

      {/* Badges */}
      <div className="absolute top-0 flex end-0 gap-2 p-2 justify-between items-center start-0">
        <ProductCardWishlist productId={singleProduct.id} />
        <div className="flex gap-2">
          <Badge
            className={cn(
              showNew() ? "block" : "hidden",
              "bg-zinc-100 dark:bg-zinc-100 text-zinc-700 hover:bg-zinc-100 py-1 px-2",
              "bg-zinc-100 dark:bg-zinc-100 text-zinc-700 hover:bg-zinc-100 py-1 px-2",
            )}
          >
            {t("new")}
          </Badge>

          <Badge
            className={cn(
              showHot() ? "block" : "hidden",
              "bg-soft-pink-50 text-maroon-600 hover:bg-soft-pink-300 py-1 px-2",
              "bg-soft-pink-50 text-maroon-600 hover:bg-soft-pink-300 py-1 px-2",
            )}
          >
            {t("hot")}
          </Badge>

          <Badge
            className={cn(
              showOutOfStock() ? "block" : "hidden",

              "text-soft-pink-200 bg-red-600 hover:bg-red-600 py-1 px-2",
              "text-soft-pink-200 bg-red-600 hover:bg-red-600 py-1 px-2",
            )}
          >
            {t("out-of-stock")}
          </Badge>
        </div>
      </div>
    </div>
  );
}
