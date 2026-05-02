import Image from "next/image";
import { getFormatter, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CategoryType } from "@/lib/types/category";

const CategoriesCard = async ({ category }: { category: CategoryType }) => {
  const format = await getFormatter();
  const t = await getTranslations();

  const visibleSubs = category.subCategories?.slice(0, 3) ?? [];
  const extraCount = (category.subCategories?.length ?? 0) - visibleSubs.length;

  return (
    <Link
      key={category.id}
      href={`/categories/${category.id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-soft-pink-100 dark:bg-zinc-700 border border-black/5 dark:border-white/5 shadow-[0_0_0_1px_rgba(0,0,0,0.04)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)] transition-all focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20"
    >
      {/* Image section */}
      <div className="relative aspect-square">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1b1b24] dark:to-[#0f0f14]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-transparent dark:from-black/70 dark:via-black/30 dark:to-transparent" />

        {/* Products count badge */}
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-black/5 text-gray-800 border border-black/10 backdrop-blur px-3 py-1 text-xs dark:bg-white/10 dark:text-gray-200 dark:border-white/10">
            {format.number(Number(category._count?.products || 0), "number-base")} {t("products")}
          </span>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 right-0 left-0 p-4">
          <h3 className="text-gray-900 dark:text-white text-base md:text-lg font-semibold truncate">
            {category.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
            {t("view")}
          </p>
        </div>
      </div>

      {/* Subcategories section */}
      {visibleSubs.length > 0 && (
        <div className="px-3 py-2 mt-auto h-12 bg-white/60 dark:bg-zinc-800/60 border-t border-black/5 dark:border-white/5 flex flex-wrap gap-1.5">
          {visibleSubs.map((sub) => (
            <span
              key={sub.id}
              className="inline-flex items-center rounded-full bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-700/50 px-2 py-0.5 text-[10px] font-medium leading-tight transition-colors group-hover:bg-pink-100 dark:group-hover:bg-pink-900/50"
            >
              {sub.title}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-600 px-2 py-0.5 text-[10px] font-medium leading-tight">
              +{extraCount}
            </span>
          )}
        </div>
      )}
    </Link>
  );
};

export default CategoriesCard;
