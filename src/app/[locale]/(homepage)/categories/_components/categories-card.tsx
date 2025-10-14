import Image from "next/image";
import { getFormatter, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AllCategory } from "@/lib/types/category";

const CategoriesCard = async ({ category }: { category: AllCategory["categories"][number] }) => {
  const format = await getFormatter();
  const t = await getTranslations();
  return (
    <Link
      key={category._id}
      href={`/categories/${category._id}`}
      className="group relative overflow-hidden rounded-xl bg-soft-pink-100 dark:bg-zinc-700 border border-black/5 dark:border-white/5 shadow-[0_0_0_1px_rgba(0,0,0,0.04)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)] transition-all focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20"
    >
      <div className="relative aspect-square">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1b1b24] dark:to-[#0f0f14]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-transparent dark:from-black/70 dark:via-black/30 dark:to-transparent" />

        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-black/5 text-gray-800 border border-black/10 backdrop-blur px-3 py-1 text-xs dark:bg-white/10 dark:text-gray-200 dark:border-white/10">
            {format.number(Number(category.productsCount || 0), "number-base")} {t("products")}
          </span>
        </div>

        <div className="absolute bottom-0 right-0 left-0 p-4">
          <h3 className="text-gray-900 dark:text-white text-base md:text-lg font-semibold truncate">
            {category.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
            {t("view")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoriesCard;
