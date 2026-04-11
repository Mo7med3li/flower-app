import { Skeleton } from "@/components/ui/skeleton";

export default function BestSellingSkeleton() {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-12 gap-8 mb-32 mt-28 lg:px-20 px-4">
      {/* Title skeleton */}
      <div className="col-span-3 flex flex-col justify-between">
        <div className="space-y-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-16 w-full" />
        </div>
        <Skeleton className="mt-8 h-12 w-32" />
      </div>

      {/* Products carousel skeleton */}
      <div className="col-span-12 md:col-span-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
