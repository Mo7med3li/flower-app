import { useInfiniteQuery } from "@tanstack/react-query";
import { getPaginatedCategories } from "../api/get-categories-filter";
export default function useInfiniteCategories() {
  return useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: getPaginatedCategories,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.status || !("payload" in lastPage) || !lastPage.payload) {
        return undefined;
      }

      const isLastPage = lastPage.payload.metadata?.page >= lastPage.payload.metadata?.totalPages;

      return isLastPage ? undefined : lastPage.payload.metadata?.page + 1;
    },
  });
}
