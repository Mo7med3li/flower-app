import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/apis/products.api";
import { SearchParamProduct } from "@/lib/types/products";

export function useFetchProducts(params?: SearchParamProduct) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["products-best-selling", params],
    queryFn: async () => {
      const response = await getProducts(params);
      if (!response.status) {
        throw new Error(response.message || "Failed to load products");
      }
      return response.payload;
    },
  });

  return {
    isLoading,
    data,
    error,
    products: data?.data || [],
  };
}
