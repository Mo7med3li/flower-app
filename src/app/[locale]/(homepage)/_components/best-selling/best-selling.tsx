"use client";

import { Suspense } from "react";
import { useFetchProducts } from "@/hooks/products/use-fetch-products";
import BestSellingSkeleton from "@/components/skeletons/best-selling/best-selling.skeleton";
import BestSellingSection from "./best-selling-section";
import BestSellingEmpty from "./best-selling-empty";
import BestSellingError from "./best-selling-error";

// Main component wrapper
function BestSellingWrapper() {
  const { isLoading, error, products } = useFetchProducts({ limit: 10 });

  if (isLoading) {
    return <BestSellingSkeleton />;
  }

  if (error) {
    return <BestSellingError error={error.message} onRetry={() => window.location.reload()} />;
  }

  if (products.length === 0) {
    return <BestSellingEmpty />;
  }

  return <BestSellingSection products={products} />;
}

export default function BestSelling() {
  return (
    <Suspense fallback={<BestSellingSkeleton />}>
      <BestSellingWrapper />
    </Suspense>
  );
}
