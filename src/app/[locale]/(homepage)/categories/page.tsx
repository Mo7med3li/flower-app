import { getTranslations } from "next-intl/server";
import type { AllCategory } from "@/lib/types/category";
import { getAllCategory } from "./_api/get-categories";
import CategoriesCard from "./_components/categories-card";

const CategoriesPage = async ({ params }: { params: { locale: string } }) => {
  // Category response
  const response = await getAllCategory();

  // Translation
  const isRTL = params?.locale?.toLowerCase().startsWith("ar");
  const t = await getTranslations();

  if (!response || !response.categories || response.categories.length === 0) {
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
          {response.categories.map((category: AllCategory["categories"][number]) => (
            <CategoriesCard key={category._id} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;
