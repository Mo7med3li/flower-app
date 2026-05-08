import { Skeleton } from "@/components/ui/skeleton";

export default function SubCategoryPageSkeleton() {
  return (
    <section className="w-full px-4 md:px-20 py-8 space-y-10">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-36" />
      </div>

      {/* Hero banner skeleton */}
      <div className="relative overflow-hidden rounded-3xl">
        <Skeleton className="h-52 md:h-64 w-full rounded-3xl" />
        <div className="absolute bottom-0 left-0 right-0 p-8 space-y-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
          <div className="flex items-center gap-3 pt-2">
            <Skeleton className="h-7 w-28 rounded-full" />
            <Skeleton className="h-7 w-28 rounded-full" />
          </div>
        </div>
      </div>

      {/* Stats row skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-zinc-100 dark:border-zinc-800 p-5">
            <Skeleton className="h-8 w-8 rounded-full mb-3" />
            <Skeleton className="h-7 w-16 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>

      {/* Products heading */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>

      {/* Products grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <div className="space-y-2 px-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between items-center pt-1">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
