import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getProducts } from "@/lib/api/products.api";
import { getSingleOccasion } from "./_api/get-single-occasion";
import ProductOccasions from "./_components/product-occasions";

const OccasionsDetailPage = async ({ params }: { params: { id: string } }) => {
  const t = await getTranslations();

  // Occasion response
  const responseOccasion = await getSingleOccasion(params.id);
  if (!responseOccasion.status) {
    throw new Error(responseOccasion.message || "Failed to fetch occasion");
  }
  const occasionResult = responseOccasion.data || responseOccasion.payload;
  const occasion = occasionResult?.occasion || occasionResult;

  // Occasion products response
  const responseProducts = await getProducts({ occasion: params.id });
  if (!responseProducts.status) {
    throw new Error(responseProducts.message || "Error fetching products");
  }

  const productsResult = responseProducts.payload;
  const products = productsResult?.data || [];

  return (
    <section className="w-full px-4 md:px-20 py-5">
      <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700/60 dark:bg-zinc-800/60">
        {/** Occasion cover (if available) */}
        {occasion?.image ? (
          <div className="relative h-40 w-full sm:h-52 md:h-64">
            <Image
              src={occasion.image}
              alt={occasion.title}
              fill
              priority
              quality={85}
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
          </div>
        ) : (
          <div className="h-40 w-full sm:h-52 md:h-64 bg-gradient-to-r from-pink-100 via-rose-100 to-amber-100 dark:from-pink-900/30 dark:via-rose-900/30 dark:to-amber-900/30" />
        )}
        {/** On-image content overlay */}
        <div className="pointer-events-none absolute bottom-0 right-0 p-4 sm:p-6">
          <h1 className="text-white drop-shadow-md text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
            {occasion?.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-white/90">
            {t("number-of-products", { count: products.length })}
          </p>
        </div>
      </div>

      <ProductOccasions products={products} />
    </section>
  );
};

export default OccasionsDetailPage;
