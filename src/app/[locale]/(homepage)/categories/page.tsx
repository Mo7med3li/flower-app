import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import type { CategoryType } from "@/lib/types/category";
import PaginationComponent from "@/components/common/Pagination-components";
import { getAllCategory } from "./_api/get-categories";
import CategoriesCard from "./_components/categories-card";
export const metadata: Metadata = {
  title: "Categories",
};
const CategoriesPage = async ({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams?: Record<string, string>;
}) => {
  // Category response
  const response = await getAllCategory({ searchParams });

  // Translation
  const isRTL = params?.locale?.toLowerCase().startsWith("ar");
  const t = await getTranslations();

  if (!response.status) {
    return (
      <div dir={isRTL ? "rtl" : "ltr"} className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-700 dark:text-gray-300 text-lg">{t("error-while-fetching-data")}</p>
      </div>
    );
  }

  const result = response.payload;
  const categories = (result?.data as unknown as CategoryType[]) || [];

  if (categories.length === 0) {
    return (
      <div dir={isRTL ? "rtl" : "ltr"} className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-700 dark:text-gray-300 text-lg">{t("empty")}</p>
      </div>
    );
  }

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-[70vh] bg-gradient-to-b from-white to-gray-50 dark:from-zinc-800 dark:to-zinc-900"
    >
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-right text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {t("categories")}
        </h1>
        <p className="text-right text-gray-600 dark:text-gray-400 mb-8">{t("subtitle")}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category: CategoryType) => (
            <CategoriesCard key={category.id} category={category} />
          ))}
        </div>
        <div className="col-span-9 mt-5">
          <PaginationComponent metaData={response.payload?.metadata} />
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;
