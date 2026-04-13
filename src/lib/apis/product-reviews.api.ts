import type { ReviewsResponse } from "@/lib/types/add-product-review";

type FetchProductReviewsProps = {
  pageParam: number;
  productId: string;
};
export async function fetchProductReviews({ productId }: FetchProductReviewsProps) {
  const response = await fetch(`/api/get-product-reviews/${productId}`);

  const payload: APIResponse<ReviewsResponse> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload as SuccessfulResponse<ReviewsResponse>;
}
