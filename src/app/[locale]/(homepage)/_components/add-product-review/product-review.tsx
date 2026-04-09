"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFormatter, useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import ProductReviewSkeleton from "@/components/skeletons/product-reviews/product-review.skeleton";
import { Review } from "@/lib/types/add-product-review";
import AddProductReviewForm from "./add-product-review-form";
import RateUser from "./rate-user";
import Stars from "./stars";
import { useFetchProductReview } from "../../_hooks/use-fetch-product-review";

type ProductReviewProps = {
  productId: string;
  rateAvg: number;
  rateCount: number;
};

export default function ProductReview({ productId, rateCount, rateAvg }: ProductReviewProps) {
  // Translation
  const format = useFormatter();
  const t = useTranslations();

  // Session
  const { data: session } = useSession();

  // Hooks
  const { fetchNextPage, hasNextPage, isLoading, payload } = useFetchProductReview({ productId });
  // @ts-expect-error - payload is typed as any
  const reviews = payload?.pages.flatMap((page) => page.data as Review[]) ?? [];

  if (isLoading) {
    return <ProductReviewSkeleton />;
  }

  return (
    <main>
      <div className="space-y-3 my-4">
        {/* Title */}
        <h3 className="relative w-fit text-4xl font-bold text-maroon-700 before:absolute before:bottom-0 before:h-[1px] before:w-[30%] before:bg-maroon-400  after:absolute after:bottom-0 after:left-0 after:-z-10 after:h-1/2 after:w-[60%] after:rounded-e-full after:bg-maroon-100  dark:text-soft-pink-200 before:dark:bg-maroon-200 after:dark:bg-zinc-700 after:rtl:right-0">
          {t("product-reviews")}
        </h3>

        {/* Product Rating */}
        <div className="space-y-2">
          <h4 className="text-zinc-800 font-semibold text-xl ">{t("general-rating")}</h4>
          <div className="flex gap-1 items-center">
            <span className="font-bold text-2xl">
              {format.number(rateAvg ?? 4.5, "number-base")}
            </span>
            <span className="font-medium text-sm text-zinc-500">
              ({format.number(rateCount ?? 4, "number-base")} {t("rating")})
            </span>
          </div>
          <div className="flex gap-2">
            {/* Ratings */}
            <Stars rating={rateAvg ?? 4.5} />
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 border-t-2 pt-4 gap-4 md:gap-6">
        {/* Reviews List / Empty State */}
        <div className="col-span-1 max-h-[60vh] md:max-h-[367px] overflow-y-auto">
          {reviews.length === 0 ? (
            <div className="h-full min-h-[300px] flex items-center justify-center p-6">
              <div className="text-center space-y-2">
                <div className="mx-auto h-16 w-16 rounded-full bg-maroon-100 text-maroon-700 flex items-center justify-center text-2xl">
                  ★
                </div>
                <h5 className="text-lg font-semibold text-zinc-800">{t("no-reviews-yet")}</h5>
                <p className="text-sm text-zinc-500">{t("be-the-first-to-review")}</p>
              </div>
            </div>
          ) : (
            <InfiniteScroll
              className="space-y-[10px]"
              dataLength={reviews.length}
              next={fetchNextPage}
              hasMore={hasNextPage}
              loader={<ProductReviewSkeleton />}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>{t("no-more-reviews")}</b>
                </p>
              }
            >
              {/* Product Reviews */}
              {reviews.map((review) => (
                // <ProductReviewItem key={review._id} review={review} />
                <section className="p-4 md:p-5 space-y-[10px]" key={review.id}>
                  <RateUser rating={review.rating} user={review.user} />
                  <section className="space-y-[6px]">
                    <h6 className="text-base font-semibold text-black dark:text-white">
                      {review.headline}
                    </h6>
                    <p className="h-28 md:h-32 overflow-y-auto border-b-2 py-1">{review.content}</p>
                  </section>
                  <RateUser rating={review.rating} user={review.user} />
                </section>
              ))}
            </InfiniteScroll>
          )}
        </div>
        <div className="col-span-1 p-4 md:p-5 relative border-t-2 md:border-t-0 md:border-l-2 rtl:md:border-r-2">
          {/* Check if user or not */}
          {!session && (
            <div className="inset-0 absolute bg-white bg-opacity-50 flex items-center justify-center">
              <p className="font-semibold text-zinc-800 text-base">
                {t("please-login-to-be-able-to-review-the-product")}
              </p>
            </div>
          )}

          {/* AddProduct Form */}
          <AddProductReviewForm productId={productId} />
        </div>
      </section>
    </main>
  );
}
