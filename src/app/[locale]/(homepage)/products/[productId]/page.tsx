import { Suspense } from "react";
import { getLocale } from "next-intl/server";
import { getProductDetails } from "@/lib/apis/products.api";
import SingleProductSkeleton from "@/components/skeletons/single-product/single-product.skeleton";
// import { RealatedProductsCarousel } from "./_components/related-products-carousel";
import ProductThumbnail from "./_components/product-thumbnail";
import ProductPage from "./_components/product-page";
import ProductReview from "../../_components/add-product-review/product-review";

interface ProductDetailsProps {
  params: {
    productId: string;
  };
}

export default async function Page({ params }: ProductDetailsProps) {
  // Translation
  // const t = await getTranslations();
  const locale = await getLocale();

  // Extracting search params
  const { productId } = params;

  // Functions
  const response = await getProductDetails(productId);

  if ("error" in response) {
    return <p className="text-center text-red-500">error</p>;
  }

  const { product } = response;
  // const thumbnailImages = [product.imgCover, ...product.images];

  return (
    <>
      <div className="mt-16 grid grid-cols-12 gap-16 px-20">
        {/* Product thumbnail */}
        <div className="col-span-6">
          <ProductThumbnail thumbnailImages={product.images} />
        </div>

        {/* Product description */}
        <div className="col-span-6">
          <ProductPage locale={locale} product={product} />
        </div>
        {/* Reviews */}
        <section className="col-span-12">
          <ProductReview
            productId={productId}
            rateAvg={product.rateAvg}
            rateCount={product.rateCount}
          />
        </section>
        <div className="mt-12 col-span-12">
          {/* Title */}
          {/* <BarTitle
            title={t("related-products-heading")}
            highlightBarWidth="w-[27%]"
            mainBarWidth="w-9/12"
          /> */}

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
            {/* <RelatedProductsCarousel productId={productId} /> */}
          </Suspense>
        </div>
      </div>
    </>
  );
}
