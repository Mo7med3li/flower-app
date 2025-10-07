import { useInfiniteQuery } from "@tanstack/react-query";
import { getPaginatedCategories } from "../api/get-categories-filter";
export default function useInfiniteCategories() {
  return useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: getPaginatedCategories,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const isLastPage = lastPage.metadata?.currentPage >= lastPage.metadata?.totalPages;

      return isLastPage ? undefined : lastPage.metadata?.currentPage + 1;
    },
  });
}
