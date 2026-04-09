import { useQuery } from "@tanstack/react-query";
import { UserAddresses } from "@/lib/types/user-addresses";

export default function useFetchAddresses() {
  const {
    isLoading,
    data: payload,
    error,
    isError,
  } = useQuery({
    queryKey: ["user-addresses"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/get-addresses`);
      const payload: APIResponse<UserAddresses> = await response.json();
      if (!payload.status) {
        throw new Error(payload.message || "Something went wrong");
      }
      return payload as SuccessfulResponse<UserAddresses>;
    },
  });
  return {
    isLoading,
    payload,
    isError,
    error,
  };
}
