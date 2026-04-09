import { getTranslations } from "next-intl/server";
import Image from "next/image";
import SingleProduct from "@/components/common/single-product";
import { Product } from "@/lib/types/products";
import { getSingleCategory } from "./_api/get-single-category";

const CategoryPage = async ({ params }: { params: { id: string } }) => {
  // Translation
  const t = await getTranslations();

  // Category response
  const responseCategory = await getSingleCategory(params.id);

  if (!responseCategory.status) {
    throw new Error(responseCategory.message || "Failed to fetch category");
  }

  const category = responseCategory.payload.category;

  const products = responseCategory.payload.category.products;

  return (
    <section className="w-full px-4 md:px-20 py-5">
      <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700/60 dark:bg-zinc-800/60">
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/0 dark:from-zinc-900/40 dark:to-zinc-900/0" />
        {/** Category cover (if available) */}
        {category?.image ? (
          <div className="relative h-24 w-full sm:h-32 md:h-40">
            <Image
              src={category.image}
              alt={category.title}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>
        ) : (
          <div className="h-20 w-full sm:h-28 md:h-36 bg-gradient-to-r from-pink-100 via-rose-100 to-amber-100 dark:from-pink-900/30 dark:via-rose-900/30 dark:to-amber-900/30" />
        )}
        <div className="relative px-4 pb-5 pt-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl">
            {category?.title}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            {t("number-of-products", { count: products.length })}
          </p>
        </div>
      </div>

      <div className="mt-6">
        {products.length === 0 ? (
          <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-zinc-300 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            {t("no-products-found")}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-4">
            <h2 className="text-2xl col-span-1 md:col-span-6 lg:col-span-4 font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl">
              {t("category-products")}
            </h2>
            {products.map((product: Product) => (
              <SingleProduct key={product.id} singleProduct={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;
