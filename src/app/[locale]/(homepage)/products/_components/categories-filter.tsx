"use client";

import React from "react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import FilterCategorySkeleton from "@/components/skeletons/category/FilterCategorySkeleton";
import ResetComponent from "@/components/common/reset-button";
import { CategoryType } from "@/lib/types/category";
import useInfiniteCategories from "../_hooks/use-infinite-categories";

export default function FilterCategories() {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Translation
  const t = useTranslations();

  // Variables
  const selectedCategory = searchParams.get("categoryId");

  // Hooks
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteCategories();
  if (data && "error" in data)
    return <div className="text-red-500 text-center font-primary py-4">Some error occurred</div>;
  const categories = data?.pages.flatMap((page) => (page.status ? page.payload.data : [])) ?? [];

  // Functions
  const handleClick = (id: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (id === selectedCategory) {
      newParams.delete("categoryId");
    } else {
      newParams.set("categoryId", id);
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg font-primary">{t("categories")}</h3>
        {selectedCategory && (
          <ResetComponent paramKey={["categoryId"]} onResetFormValues={() => {}} />
        )}
      </div>

      {/* Skeleton */}
      {isLoading && <FilterCategorySkeleton />}

      {/* Categories list */}
      {categories.length !== 0 ? (
        <InfiniteScroll
          dataLength={categories.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            isFetchingNextPage ? (
              <div className="mt-2">
                <FilterCategorySkeleton />
              </div>
            ) : null
          }
          scrollableTarget="scrollableDiv"
        >
          <ul
            id="scrollableDiv"
            className="h-[260px] hide-scroll space-y-1 overflow-y-auto border-b-zinc-100 pb-5 pt-2.5 scrollbar-hide"
          >
            {categories.map((category: CategoryType) => (
              <li
                key={category.id}
                className={cn(
                  "group flex items-center gap-1 text-sm rtl:pr-0",
                  selectedCategory === category.id ? "" : "",
                )}
              >
                {/* Image inside wrapper for styling */}
                <button
                  type="button"
                  onClick={() => handleClick(category.id)}
                  aria-pressed={selectedCategory === category.id}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md border border-transparent p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500 hover:bg-maroon-50",
                    selectedCategory === category.id
                      ? "bg-maroon-50 dark:bg-soft-pink-100 dark:text-zinc-800"
                      : "bg-zinc-200 dark:bg-zinc-700 dark:hover:text-zinc-800",
                  )}
                >
                  <div
                    className={cn(
                      "rounded-md p-1.5 transition-colors",
                      selectedCategory === category.id
                        ? "bg-maroon-600 dark:bg-soft-pink-300"
                        : "bg-zinc-400 group-hover:bg-maroon-600 dark:group-hover:bg-soft-pink-300",
                    )}
                  >
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={24}
                      height={24}
                      className="shrink-0"
                    />
                  </div>
                  <span className="ms-1.5 truncate font-medium flex-1 text-left">
                    {category.title}
                  </span>
                  {selectedCategory === category.id && <Check className="size-4 text-maroon-600" />}
                </button>
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      ) : (
        !isLoading && (
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            {t("no-categories-found")}
          </p>
        )
      )}
    </div>
  );
}
