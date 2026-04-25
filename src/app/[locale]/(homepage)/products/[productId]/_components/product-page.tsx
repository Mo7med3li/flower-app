import { Heart, Package, ShoppingCart, Star, StarHalf } from "lucide-react";
import { getServerSession } from "next-auth";
import { getFormatter, getTranslations } from "next-intl/server";
import { authOptions } from "@/auth";
import { Product } from "@/lib/types/products";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddToWishlist from "../../[productId]/_components/add-wishlist";
import AddToCartButton from "../../[productId]/_components/add-to-cart-button";

function getCurrencyParts(
  locale: string,
  currency: string,
  value: number,
  options?: Intl.NumberFormatOptions,
) {
  const parts = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...options,
  }).formatToParts(value);

  const symbol = parts.find((p) => p.type === "currency")?.value ?? "";
  const number = parts
    .filter((p) => p.type !== "currency")
    .map((p) => p.value)
    .join("");

  return { number, symbol };
}

interface ProductPageProps {
  product: Product;
  locale: string;
}

export default async function ProductPage({ product, locale }: ProductPageProps) {
  // Session
  const session = await getServerSession(authOptions);

  // Check if user is logged in
  const isLoggedIn = !!session?.user;

  // translations
  const format = await getFormatter();
  const t = await getTranslations();

  const currency = "EGP";
  
  // Calculate price after discount
  const calculatedPriceAfterDiscount =
    product.discountType === "percentage" || product.priceType === "PERCENT"
      ? product.price - product.price * (product.discountValue / 100)
      : product.price - product.discountValue;

  const hasDiscount = product.discountValue > 0;

  // Price formatting
  const originalPriceFormatted = getCurrencyParts(locale, currency, product.price, {
    maximumFractionDigits: 0,
    numberingSystem: locale === "ar" ? "arab" : "latn",
  });

  const currentPriceFormatted = getCurrencyParts(locale, currency, calculatedPriceAfterDiscount, {
    maximumFractionDigits: 2,
    numberingSystem: locale === "ar" ? "arab" : "latn",
  });

  const discountPercent = hasDiscount
    ? product.discountType === "percentage" || product.priceType === "PERCENT"
      ? product.discountValue
      : Math.round((product.discountValue / product.price) * 100)
    : 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="w-full gap-4 pt-6 md:pt-10 pb-6">
      {/* Product Details Section */}
      <div className="w-full flex flex-col min-h-0">
        {/* Product Title */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-semibold font-primary text-3xl text-zinc-800 dark:text-zinc-50">
            {product.title}
          </h2>
          {hasDiscount && (
            <span className="shrink-0 rounded-full bg-red-50 text-red-600 px-3 py-1 text-sm font-semibold ring-1 ring-red-200">
              -{format.number(discountPercent / 100, "percentage-float")}
            </span>
          )}
        </div>

        {/* Price and Stock Information */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
          <div className="mt-4 flex items-baseline gap-3">
            {/* Original price (crossed out if discounted) */}
            {hasDiscount && (
              <span className="text-2xl text-zinc-500 font-semibold line-through">
                {originalPriceFormatted.number}
              </span>
            )}

            {/* Current price with currency symbol */}
            <span className="text-3xl font-primary font-bold text-zinc-800 dark:text-zinc-50 flex items-baseline gap-1">
              <span>{currentPriceFormatted.number}</span>
              <span className="text-xl">{currentPriceFormatted.symbol}</span>
            </span>
          </div>

          {/* Stock quantity indicator */}
          <div
            className={
              "flex items-center gap-1 py-1.5 px-3 rounded-3xl mt-2 ring-1 " +
              (product.stock === 0
                ? "bg-zinc-100 ring-zinc-200 text-zinc-800 dark:text-zinc-50"
                : lowStock
                  ? "bg-amber-50 ring-amber-200 text-amber-700"
                  : "bg-emerald-50 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-50 ")
            }
          >
            <Package className="size-5" />
            <div className="flex items-center gap-1 font-medium font-primary text-sm">
              <span>{format.number(product.stock, "number-base")}</span>
              <p>{product.stock === 0 ? t("out-of-stock") : t("left-in-stock")}</p>
            </div>
          </div>
        </div>

        {/* Product Rating */}
        <div className="flex items-center justify-between border-y border-zinc-100 py-3 md:py-4">
          <div className="flex items-center gap-2">
            {/* Stars */}
            <div className="flex items-center gap-1 text-orange-400">
              {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                <Star key={i} fill="#FFA500" className="text-[#FFA500]" />
              ))}
              {product.rating % 1 !== 0 && <StarHalf fill="#FFA500" className="text-[#FFA500]" />}
            </div>
            <span className="font-primary font-semibold text-zinc-800 dark:text-zinc-50">
              {format.number(product.rating, "number-base")}/{format.number(5, "number-base")}
            </span>
            <span className="text-sm text-blue-600 font-medium ">
              ({format.number(product.ratings, "number-base")} {t("ratings")})
            </span>
          </div>

          {/* Social Proof Stats */}
          <div className="flex items-center gap-4">
            {product?._count && (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50/50 dark:bg-red-500/10 border border-red-100/50 dark:border-red-500/20">
                  <Heart className="size-4 text-red-500 fill-red-500/20" />
                  <span className="text-xs font-semibold text-red-700 dark:text-red-400">
                    {format.number(product._count.wishlistItems, "number-base")}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-maroon-50/50 dark:bg-maroon-500/10 border border-maroon-100/50 dark:border-maroon-500/20">
                  <ShoppingCart className="size-4 text-maroon-600 dark:text-maroon-400" />
                  <span className="text-xs font-semibold text-maroon-700 dark:text-maroon-300">
                    {format.number(product._count.cartItems, "number-base")}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Product Description */}
        <ScrollArea className="h-32 md:h-40 rounded-md border-none mt-4">
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{product.description}</p>
        </ScrollArea>
        {/* Action Buttons */}
        <div className="pt-4">
          {product.stock > 0 ? (
            // In stock - show both wishlist and cart buttons
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <div>
                <AddToWishlist productId={product.id} />
              </div>
              <div className="sm:flex-1">
                <AddToCartButton productId={product.id} isLoggedIn={isLoggedIn} />
              </div>
            </div>
          ) : (
            // Out of stock - show only wishlist button (extended)
            <div>
              <AddToWishlist extend productId={product.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
