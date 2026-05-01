import { Suspense } from "react";
import { Metadata } from "next";
import { SearchParamProduct } from "@/lib/types/products";
import SingleProductSkeleton from "@/components/skeletons/single-product/single-product.skeleton";
import Filter from "./_components/filter";
import ProductList from "./_components/product-list";
export const metadata: Metadata = {
  title: "Products",
};
export default function Page({ searchParams }: { searchParams?: SearchParamProduct }) {
  return (
    <div className="grid grid-cols-12 gap-6 mb-32 mt-16 px-4 lg:px-20">
      {/* Filters */}
      <Filter />

      {/* Product list */}
      <Suspense
        fallback={
          <SingleProductSkeleton
            count={6}
            containerColSpan={9}
            containerGridCols={9}
            skeletonColSpan={3}
          />
        }
        key={searchParams?._id}
      >
        <ProductList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
