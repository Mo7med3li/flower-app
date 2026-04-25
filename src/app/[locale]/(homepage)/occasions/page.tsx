import { getTranslations } from "next-intl/server";
import Image from "next/image";
import PaginationComponent from "@/components/common/Pagination-components";
import { getOccasions } from "@/lib/api/occasions.api";
import { occasion, SearchParamOcassion } from "@/lib/types/occasions";
import { Link } from "@/i18n/navigation";

const OccasionsPage = async ({ searchParams }: { searchParams: SearchParamOcassion }) => {
  const t = await getTranslations();
  const response = await getOccasions(searchParams);

  if (!response.status) {
    return (
      <div className="px-4 md:px-20 py-6 text-sm text-red-600 dark:text-red-400">
        {response.message}
      </div>
    );
  }

  const result = response.payload;
  // PaginatedResponse<occasions> -> result.data is occasions { data: occasion[] }
  const items = (result?.data as occasion[]) || [];

  return (
    <section className="w-full px-4 md:px-20 py-6">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {t("occasions")}
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          {t("number-of-products", {
            count: items.reduce((a: number, c) => a + (c._count?.products ?? 0), 0),
          })}
        </p>
      </header>

      {items.length === 0 ? (
        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-zinc-300 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
          {t("no-products-in-this-occasion")}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {items.map((o) => (
            <article
              key={o.id}
              className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700/60 dark:bg-zinc-800/60"
            >
              <Link href={`/occasions/${o.id}`}>
                <div className="relative h-36 w-full sm:h-40 md:h-44">
                  {o.image ? (
                    <Image
                      src={o.image.startsWith("http") ? o.image : ""}
                      alt={o.title}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-pink-100 via-rose-100 to-amber-100 dark:from-pink-900/30 dark:via-rose-900/30 dark:to-amber-900/30" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="truncate text-sm font-medium text-white drop-shadow">
                      {o.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-white/90">
                      {t("number-of-products", { count: o._count?.products ?? 0 })}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}

      {result?.metadata && (
        <div className="mt-8">
          <PaginationComponent metaData={result.metadata} />
        </div>
      )}
    </section>
  );
};

export default OccasionsPage;
