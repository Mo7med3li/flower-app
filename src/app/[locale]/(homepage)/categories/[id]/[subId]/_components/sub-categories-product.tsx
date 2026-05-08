import { getTranslations } from "next-intl/server";
import { Package, Sparkles } from "lucide-react";
import { subCategory } from "@/lib/types/sub-category";
import { Link } from "@/i18n/navigation";
import SingleProduct from "@/components/common/single-product";

/* ─── Products Section (inner async component) ─────────── */
export default async function SubCategoriesProduct({ subCategory }: { subCategory: subCategory }) {
  const t = await getTranslations();
  const products = subCategory.products ?? [];

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-8 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-700/60 bg-zinc-50/50 dark:bg-zinc-800/20">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-950/40 dark:to-pink-950/40 flex items-center justify-center mb-5">
          <Package className="w-10 h-10 text-rose-400 dark:text-rose-500" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
          {t("no-products-found")}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center max-w-sm">
          {t("error-description")}
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-medium shadow hover:shadow-lg hover:shadow-rose-500/20 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          {t("shop-products")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <SingleProduct key={product.id} singleProduct={product} />
      ))}
    </div>
  );
}
