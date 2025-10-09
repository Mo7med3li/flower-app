import React from "react";
import PriceFilter from "./price-filter";
import OccasionFilter from "./occasion-filter";
import RatingFilter from "./rating-filter";
import FilterCategories from "./categories-filter";
import ResetAll from "./reset-all";

export default function Filter() {
  return (
    <div className="col-span-12 lg:col-span-3 flex flex-col lg:sticky top-0 lg:h-screen h-auto lg:overflow-y-auto overflow-visible pe-0 lg:pe-6 border-none lg:border-e-2 border-zinc-100 dark:border-zinc-700 mb-6 lg:mb-0">
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
