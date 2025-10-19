import { Skeleton } from "@/components/ui/skeleton";

export default function SummarySkeleton() {
  return (
    <div className="col-span-1 flex flex-col gap-6 animate-pulse">
      {/* title */}
      <div className="h-8 w-1/3 bg-zinc-200 dark:bg-zinc-700 rounded-md" />

      <div className="flex flex-col gap-4 p-4 rounded-md bg-zinc-50 dark:bg-zinc-800">
        {/* Coupon input + button */}
        <div className="flex gap-3 items-center">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>

        {/* Coupons box */}
        <div className="h-60 flex justify-center items-center rounded-lg border dark:border-zinc-500">
          <Skeleton className="h-5 w-40" />
        </div>

        {/* subtotal */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-24 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>

          {/* discount */}
          <div className="flex justify-between">
            <Skeleton className="h-5 w-32 rounded-md" />
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>

          {/* total */}
          <div className="flex justify-between">
            <Skeleton className="h-6 w-24 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>
        </div>
      </div>

      {/* checkout button */}
      <Skeleton className="h-14 w-full rounded-[10px]" />
    </div>
  );
}
