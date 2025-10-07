"use client";

import React, { useState } from "react";
import { Star, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const RatingFilter = () => {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();

  // Translation
  const t = useTranslations();
  const format = useFormatter();

  // Search params
  const searchParams = useSearchParams();

  // Selected rating
  const selectedRating = Number(searchParams.get("rateAvg[gte]")) || 0;
  // Hover preview state
  const [hovered, setHovered] = useState<number | null>(null);

  // Handle rating click
  const handleRatingClick = (rating: number) => {
    const params = new URLSearchParams(searchParams);
    if (rating === selectedRating) {
      params.delete("rateAvg[gte]");
    } else {
      params.set("rateAvg[gte]", rating.toString());
    }
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="mb-6 border-b-2 border-zinc-100 dark:border-zinc-700 pb-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg font-primary">{t("rating")}</h3>
        {selectedRating > 0 && (
          <button
            type="button"
            onClick={() => handleRatingClick(selectedRating)}
            className="text-sm text-red-600 hover:text-red-700 dark:hover:text-red-500 flex items-center gap-1"
          >
            <X size={16} />
            {t("reset")}
          </button>
        )}
      </div>
      {/* Rating Stars */}
      <div className="mt-2 flex gap-1">
        {[1, 2, 3, 4, 5].map((value) => {
          const isActive = value <= (hovered ?? selectedRating);
          return (
            <button
              key={value}
              type="button"
              aria-label={`${value} star${value > 1 ? "s" : ""} & up`}
              onClick={() => handleRatingClick(value)}
              onMouseEnter={() => setHovered(value)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(value)}
              onBlur={() => setHovered(null)}
              className={cn(
                "p-1 rounded-md transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                isActive ? "text-amber-500" : "text-zinc-400 dark:text-zinc-500",
              )}
            >
              <Star
                className={cn(
                  "size-6 transition-transform",
                  isActive && "fill-amber-500 scale-105",
                )}
              />
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        {selectedRating > 0
          ? `${t("showing-products-rated")}${format.number(selectedRating, "number-base")}+`
          : t("choose-a-minimum-rating")}
      </p>
    </div>
  );
};

export default RatingFilter;
