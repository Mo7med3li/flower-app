"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function UpdateUserFormSkeleton() {
  return (
    <div className="w-full space-y-6">
      {/* ===== User Photo Section ===== */}
      <section className="flex items-center gap-4">
        {/* Profile image skeleton */}
        <div className="relative">
          <Skeleton className="rounded-full w-[120px] h-[120px]" />
        </div>

        {/* Right side text */}
        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-72" />
        </div>
      </section>

      {/* ===== Form Fields ===== */}
      <div className="space-y-9">
        <div className="grid grid-cols-2 gap-3">
          {/* First name */}
          <div className="col-span-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Last name */}
          <div className="col-span-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Email */}
          <div className="col-span-2 space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Phone */}
          <div className="col-span-2 space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Gender */}
          <div className="col-span-2 space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>

      {/* ===== Actions ===== */}
      <div className="flex justify-between pt-16">
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
}
