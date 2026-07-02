import { Suspense } from "react";
import Image from "next/image";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ChevronRight, Flower2, LayoutGrid, Tag } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { subCategory } from "@/lib/types/sub-category";
import { getSubCategory } from "./_api/subcategory.api";
import SubCategoryPageSkeleton from "../../../../../../components/skeletons/category/subcategory/subcategory-page-skeleton";
import SubCategoryError from "./_components/subcategory-error";
import SubCategoriesProduct from "./_components/sub-categories-product";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; subId: string }>;
}): Promise<Metadata> {
  try {
    const { subId } = await params;
    const payload = await getSubCategory(subId);
    const sub = payload?.payload?.subCategory;
    return {
      title: `${sub?.title} | ${sub?.category?.title}`,
      description: sub?.description,
    };
  } catch {
    return { title: "Subcategory" };
  }
}

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ id: string; subId: string }>;
}) {
  const { id, subId } = await params;
  const t = await getTranslations();

  let subCategory: subCategory;

  try {
    const payload = await getSubCategory(subId);
    subCategory = payload?.payload?.subCategory as subCategory;
  } catch (error) {
    return <SubCategoryError categoryId={id} message={(error as Error).message} />;
  }

  const productCount = subCategory._count?.products ?? 0;

  return (
    <Suspense fallback={<SubCategoryPageSkeleton />}>
      <section className="w-full">
        {/* ── Hero Banner ─────────────────────────────────── */}
        <div className="relative overflow-hidden">
          {/* Background image or gradient */}
          {subCategory.category.image ? (
            <div className="relative h-56 md:h-72 w-full">
              <Image
                src={subCategory.category.image}
                alt={subCategory.category.title}
                fill
                priority
                sizes="100vw"
                className="object-cover brightness-50"
              />
            </div>
          ) : (
            <div className="h-56 md:h-72 bg-gradient-to-br from-rose-900 via-pink-800 to-rose-700 dark:from-rose-950 dark:via-pink-900 dark:to-rose-900" />
          )}

          {/* Decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute top-8 right-12 w-32 h-32 rounded-full bg-rose-400/10 blur-3xl" />
          <div className="absolute bottom-8 left-8 w-24 h-24 rounded-full bg-pink-400/10 blur-2xl" />

          {/* Hero content */}
          <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8 md:px-20 md:pb-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-white/70 mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                {t("go-home")}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/categories" className="hover:text-white transition-colors">
                {t("browse-categories")}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href={`/categories/${id}`} className="hover:text-white transition-colors">
                {subCategory.category.title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-medium truncate">{subCategory.title}</span>
            </nav>

            {/* Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-medium">
                <Tag className="w-3 h-3" />
                {subCategory.category.title}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
              {subCategory.title}
            </h1>

            {/* Description */}
            {subCategory.description && (
              <p className="text-white/75 text-sm md:text-base max-w-2xl leading-relaxed">
                {subCategory.description}
              </p>
            )}

            {/* Stats pills */}
            <div className="flex items-center gap-3 mt-5 flex-wrap">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
                <LayoutGrid className="w-4 h-4 text-rose-300" />
                <span>{t("number-of-products", { count: productCount })}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
                <Flower2 className="w-4 h-4 text-pink-300" />
                <span>{subCategory.category.title}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Page Body ────────────────────────────────────── */}
        <div className="px-4 md:px-20 py-10 space-y-10">
          {/* Section header */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-5 rounded-full bg-gradient-to-b from-rose-500 to-pink-600" />
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {t("category-products")}
                </h2>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 ms-3">
                {productCount > 0
                  ? t("number-of-products", { count: productCount })
                  : t("no-products-found")}
              </p>
            </div>

            {/* Back link */}
            <Link
              href={`/categories/${id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-rose-300 dark:hover:border-rose-700 hover:text-rose-600 dark:hover:text-rose-400 transition-all"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              {subCategory.category.title}
            </Link>
          </div>

          {/* ── Products ──────────────────────────────────── */}
          <SubCategoriesProduct subCategory={subCategory} />
        </div>
      </section>
    </Suspense>
  );
}
