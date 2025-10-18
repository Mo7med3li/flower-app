import { Skeleton } from "@/components/ui/skeleton";

const UserCartCardSkeleton = () => {
  return (
    <div className="flex items-center gap-4 border-b pb-5">
      {/* Product image skeleton */}
      <div className="relative overflow-hidden rounded-lg">
        <Skeleton className="h-[120px] w-[120px]" />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between">
          <div className="space-y-2">
            {/* Product name skeleton */}
            <Skeleton className="h-5 w-40" />
            {/* Product rating skeleton */}
            <Skeleton className="h-4 w-32" />
          </div>
          {/* Remove button skeleton */}
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>

        <div className="flex justify-between items-center">
          {/* Price skeleton */}
          <Skeleton className="h-6 w-32" />

          {/* Quantity controls skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-12 w-12 rounded-md" />
            <Skeleton className="h-12 w-20 rounded-md" />
            <Skeleton className="h-12 w-12 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCartCardSkeleton;
