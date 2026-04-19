import { Skeleton } from "@/components/ui/skeleton";
import SingleProductSkeleton from "@/components/skeletons/single-product/single-product.skeleton";
import FilterCategorySkeleton from "@/components/skeletons/category/FilterCategorySkeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-12 gap-6 mb-32 mt-16 px-4 lg:px-20">
      {/* Filters Skeleton */}
      <div className="col-span-12 lg:col-span-3 flex flex-col lg:sticky top-0 lg:h-screen h-auto lg:overflow-y-auto overflow-visible pe-0 lg:pe-6 border-none lg:border-e-2 border-zinc-100 dark:border-zinc-700 mb-6 lg:mb-0">
        <div className="mb-6 border-b-2 border-zinc-100 dark:border-zinc-700 pb-6">
          <Skeleton className="h-6 w-32 mb-5" />
          <FilterCategorySkeleton />
        </div>
        
        <div className="mb-6 border-b-2 border-zinc-100 dark:border-zinc-700 pb-6 space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded-md" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 pb-6 space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Product list Skeleton */}
      <SingleProductSkeleton
        count={6}
        containerColSpan={9}
        containerGridCols={9}
        skeletonColSpan={3}
      />
    </div>
  );
}
