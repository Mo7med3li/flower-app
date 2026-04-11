"use client";

import { Suspense, useEffect, useState } from "react";
import { getProducts } from "@/lib/apis/products.api";
import type { Product } from "@/lib/types/products";
import BestSellingSkeleton from "@/components/skeletons/best-selling/best-selling.skeleton";
import BestSellingSection from "./best-selling-section";
import BestSellingEmpty from "./best-selling-empty";
import BestSellingError from "./best-selling-error";

// Main component wrapper
function BestSellingWrapper() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getProducts({ limit: 10 });

      if (!response.status) {
        throw new Error(response.message || "Failed to load products");
      }

      const result = response.payload;
      const productList = result?.data || [];

      setProducts(productList);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return <BestSellingSkeleton />;
  }

  if (error) {
    return <BestSellingError error={error} onRetry={fetchProducts} />;
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
