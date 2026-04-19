import { Skeleton } from "@/components/ui/skeleton";
import ProductReviewSkeleton from "@/components/skeletons/product-reviews/product-review.skeleton";

export default function Loading() {
  return (
    <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 lg:gap-16 px-4 sm:px-6 md:px-10 lg:px-20">
      {/* Product thumbnail skeleton */}
      <div className="md:col-span-6 col-span-1">
        <div className="flex flex-col gap-4">
          {/* Main image skeleton */}
          <Skeleton className="w-full aspect-[4/5] md:h-[500px] object-cover rounded-[10px]" />
          {/* Thumbnail gallery items skeleton (e.g. 4 small images) */}
          <div className="flex gap-4 overflow-x-auto hide-scroll pb-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-20 lg:w-24 shrink-0 aspect-[4/5] h-24 rounded-[10px]" />
            ))}
          </div>
        </div>
      </div>

      {/* Product description skeleton */}
      <div className="md:col-span-6 col-span-1 w-full gap-4 pt-6 md:pt-10 pb-6">
        <div className="w-full flex flex-col min-h-0 gap-4">
          <div className="flex items-start justify-between gap-3">
            <Skeleton className="h-10 w-3/4 rounded-md" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 my-2">
             <div className="flex items-baseline gap-3">
               <Skeleton className="h-8 w-24 rounded-md" />
               <Skeleton className="h-8 w-32 rounded-md" />
             </div>
             <Skeleton className="h-8 w-28 rounded-3xl" />
          </div>

          <div className="flex items-center justify-between border-y border-zinc-100 py-4 my-2 dark:border-zinc-800">
            <Skeleton className="h-6 w-48 rounded-md" />
          </div>

          <div className="h-32 md:h-40 mt-4 flex flex-col gap-3">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-11/12 rounded-md" />
            <Skeleton className="h-4 w-10/12 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mt-6">
             <Skeleton className="h-12 w-12 rounded-md" />
             <Skeleton className="h-12 flex-1 rounded-[30px]" />
          </div>
        </div>
      </div>

      {/* Reviews skeleton */}
      <section className="col-span-1 md:col-span-12 mt-6">
        <ProductReviewSkeleton />
      </section>
    </div>
  );
}
