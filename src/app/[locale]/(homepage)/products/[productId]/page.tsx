import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { getProductDetails } from "@/lib/apis/products.api";
import SingleProductSkeleton from "@/components/skeletons/single-product/single-product.skeleton";
import BarTitle from "@/components/common/bar-title";
import ProductThumbnail from "./_components/product-thumbnail";
import ProductPage from "./_components/product-page";
import ProductReview from "../../_components/add-product-review/product-review";
import { RelatedProductsCarousel } from "./_components/related-products-carousel";

interface ProductDetailsProps {
  params: {
    productId: string;
  };
}

export default async function Page({ params }: ProductDetailsProps) {
  // Translation
  const t = await getTranslations();
  const locale = await getLocale();

  // Extracting search params
  const { productId } = params;

  // Functions
  const response = await getProductDetails(productId);

  if ("error" in response) {
    return <p className="text-center text-red-500">error</p>;
  }

  const { product } = response;

  return (
    <>
      <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 lg:gap-16 px-4 sm:px-6 md:px-10 lg:px-20">
        {/* Product thumbnail */}
        <div className="md:col-span-6 col-span-1">
          <ProductThumbnail thumbnailImages={product.images} />
        </div>

        {/* Product description */}
        <div className="md:col-span-6 col-span-1">
          <ProductPage locale={locale} product={product} />
        </div>
        {/* Reviews */}
        <section className="col-span-1 md:col-span-12">
          <ProductReview
            productId={productId}
            rateAvg={product.rateAvg}
            rateCount={product.rateCount}
          />
        </section>
        <div className="mt-2 col-span-1 md:col-span-12">
          {/* Title */}
          <BarTitle
            title={t("related-products-heading")}
            highlightBarWidth="w-[27%]"
            mainBarWidth="w-9/12"
          />

          {/* Related products carousel */}
          <Suspense
            fallback={
              <SingleProductSkeleton
                count={4}
                containerColSpan={12}
                containerGridCols={12}
                skeletonColSpan={3}
              />
            }
            key={product._id}
          >
            <RelatedProductsCarousel productId={productId} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
