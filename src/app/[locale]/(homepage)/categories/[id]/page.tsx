import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Image from "next/image";
import { cache } from "react";
import { Tag } from "lucide-react";
import SingleProduct from "@/components/common/single-product";
import { Product } from "@/lib/types/products";
import { Link } from "@/i18n/navigation";
import { getSingleCategory } from "./_api/get-single-category";

const categoryDetail = cache(getSingleCategory);
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const response = await categoryDetail(id);
  if ("error" in response) {
    return {
      title: "Category | Error",
    };
  }

  const categoryTitle = response.payload.category.title;

  return {
    title: `${categoryTitle}`,
  };
}
const CategoryPage = async ({ params }: { params: { id: string } }) => {
  // Translation
  const t = await getTranslations();

  // Category response
  const responseCategory = await categoryDetail(params.id);

  if (!responseCategory.status) {
    throw new Error(responseCategory.message || "Failed to fetch category");
  }

  const category = responseCategory.payload.category;
  const products = category.products ?? [];
  const subCategories = category.subCategories ?? [];

  return (
    <section className="w-full px-4 md:px-20 py-5 space-y-8">
      {/* ── Hero banner ── */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700/60 dark:bg-zinc-800/60">
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/0 dark:from-zinc-900/40 dark:to-zinc-900/0" />
        {category?.image ? (
          <div className="relative h-24 w-full sm:h-32 md:h-48">
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
          <div className="h-20 w-full sm:h-28 md:h-40 bg-gradient-to-r from-pink-100 via-rose-100 to-amber-100 dark:from-pink-900/30 dark:via-rose-900/30 dark:to-amber-900/30" />
        )}
        <div className="relative px-4 pb-6 pt-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl">
            {category?.title}
          </h1>
          {category?.description && (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
              {category.description}
            </p>
          )}
          <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
            {t("number-of-products", { count: products.length })}
          </p>
        </div>
      </div>

      {/* ── Sub-categories ── */}
      {subCategories.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Tag size={18} className="text-pink-500" />
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
              {t("sub-categories")}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {subCategories.map((sub: { id: string; title: string }) => (
              <Link
                href={`/categories/${category.id}/${sub.id}`}
                key={sub.id}
                className="group cursor-pointer flex items-center gap-2 rounded-xl border border-pink-100 dark:border-pink-800/40 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/40 dark:to-rose-950/40 px-4 py-3 shadow-sm hover:shadow-md hover:border-pink-300 dark:hover:border-pink-600 transition-all cursor-default"
              >
                <span className="flex-shrink-0 size-2 rounded-full bg-pink-400 dark:bg-pink-500 group-hover:scale-125 transition-transform" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 truncate">
                  {sub.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Products ── */}
      <div>
        {products.length === 0 ? (
          <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-zinc-300 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            {t("no-products-found")}
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
              {t("category-products")}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product: Product) => (
                <SingleProduct key={product.id} singleProduct={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;
