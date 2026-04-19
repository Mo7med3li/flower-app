"use client";

import { useTranslations } from "next-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ResetComponent from "@/components/common/reset-button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/i18n/navigation";
import { occasion } from "@/lib/types/occasions";
import OccasionSkeleton from "@/components/skeletons/occasion/occasion.skeleton";
import { getOccasions } from "../_hooks/occasions.action";

export default function OccasionFilter() {
  // variable
  const url_image = process.env.NEXT_PUBLIC_URL_IMAGE;

  // Translation
  const t = useTranslations();

  // hook
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const value = searchParams.get("occasionId");

  // useInfiniteQuery to fetch occasions
  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["occasions"],
      queryFn: ({ pageParam = 1 }) => getOccasions(pageParam),
      getNextPageParam: (lastPage) => {
        if (!lastPage.status || !("payload" in lastPage) || !lastPage.payload) {
          return undefined;
        }

        const isLastPage = lastPage.payload.metadata?.page >= lastPage.payload.metadata?.totalPages;

        return isLastPage ? undefined : lastPage.payload.metadata?.page + 1;
      },
      initialPageParam: 1,
    });

  const allOccasions = data?.pages.flatMap((page) => page.payload.data) ?? [];

  // Handle error & loading ui
  if (isLoading) {
    return <OccasionSkeleton />;
  }
  if (isError) return <p className="text-red-500">{t("error-message")}</p>;
  const handleClick = (id: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (id === value) {
      newParams.delete("occasionId");
    } else {
      newParams.set("occasionId", id);
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };

  if (allOccasions.length === 0) {
    return (
      <div className="mb-6 border-b-2 border-zinc-100 dark:border-zinc-700 pb-6">
        <div className="flex justify-between hide-scroll">
          <h3 className="font-semibold text-lg font-primary">{t("product.occasion")}</h3>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm font-medium">
            {t("product.no_occasions_available")}
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">
            {t("product.check_back_later")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 border-b-2 border-zinc-100 dark:border-zinc-700 pb-6">
      {/* header occasion filter */}

      <div className="flex justify-between hide-scroll">
        <h3 className="font-semibold text-lg font-primary">{t("product.occasion")}</h3>
        {value && <ResetComponent paramKey="occasionId" />}
      </div>

      <InfiniteScroll
        dataLength={allOccasions.length}
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={
          isFetchingNextPage ? (
            <div className="mt-2">
              <OccasionSkeleton />
            </div>
          ) : null
        }
        height={"277px"}
        className="overflow-hidden hide-scroll"
      >
        <div className="grid grid-cols-2 gap-3">
          {allOccasions
            .flatMap((occasions) => occasions)
            .map((occasion: occasion) => (
              <div
                key={occasion?.id}
                className="relative flex items-center justify-center h-20 rounded-lg col-span-2 md:col-span-1"
                onClick={() => handleClick(occasion?.id)}
              >
                <Button
                  className={cn(
                    "absolute rounded-lg z-30 w-full h-full flex justify-center items-center text-white text-base font-medium bg-gradient-to-t from-black to-transparent hover:bg-transparent hover:from-maroon-600 hover:to-transparent hover:from-10% dark:bg-gradient-to-t dark:hover:bg-transparent dark:hover:from-soft-pink-500 dark:text-white dark:hover:from-10%",
                    value === occasion?.id && "from-maroon-600 to-transparent",
                  )}
                >
                  {occasion?.title}
                </Button>
                <Image
                  src={occasion?.image ? `${url_image}${occasion?.image}` : ""}
                  alt={occasion?.title}
                  width={100}
                  height={100}
                  className="absolute z-20 rounded-lg object-cover w-full h-full "
                />
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
