import React from "react";
import PriceFilter from "./price-filter";
import OccasionFilter from "./occasion-filter";
import RatingFilter from "./rating-filter";
import FilterCategories from "./categories-filter";
import ResetAll from "./reset-all";

export default function Filter() {
  return (
    <div className="sticky top-0 h-screen overflow-y-auto col-span-3 flex flex-col pe-6 border-e-2 border-zinc-100 dark:border-zinc-700">
      <div className="mb-6 border-b-2 border-zinc-100 dark:border-zinc-700 pb-6">
        {/* Categories filter */}
        <FilterCategories />
      </div>

      {/* Occasion filter */}
      <OccasionFilter />

      {/* Rating filter  */}
      <RatingFilter />

      {/* Price filter */}
      <PriceFilter />

      {/* Reset all */}
      <ResetAll />
    </div>
  );
}
