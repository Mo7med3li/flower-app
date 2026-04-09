import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchProductReviews } from "@/lib/apis/product-reviews.api";
import { ReviewsResponse } from "@/lib/types/add-product-review";

export function useFetchProductReview({ productId }: { productId: string }) {
  const params = useParams();
  const {
    data: payload,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<ReviewsResponse>({
    queryKey: ["Product Review", productId],
    queryFn: async ({ pageParam }) => {
      const response = await fetchProductReviews({
        pageParam: pageParam as number,
        productId: params.productId as string,
      });
      return response.payload!;
    },
    initialPageParam: 1,
    getNextPageParam: (LastPage) => {
      if (!LastPage.status || !("payload" in LastPage) || !LastPage.payload) {
        return undefined;
      }

      const isLastPage = LastPage.payload.metadata?.page >= LastPage.payload.metadata?.totalPages;

      return isLastPage ? undefined : LastPage.payload.metadata?.page + 1;
    },
  });

  return {
    payload,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}
