import { useQuery } from "@tanstack/react-query";

import { UserAddresses } from "@/lib/types/user-addresses";
import { useCheckUserStatus } from "@/components/providers/components/check-user-status.provider";
import { APIResponse, SuccessfulResponse } from "@/lib/types/api";

export default function useFetchAddresses() {
  const { isAuthenticated } = useCheckUserStatus();

  const {
    isLoading,
    data: payload,
    error,
    isError,
  } = useQuery({
    queryKey: ["user-addresses"],
    queryFn: async () => {
      const response = await fetch("/api/get-addresses");
      const payload: APIResponse<UserAddresses> = await response.json();
      if (!payload.status) {
        throw new Error(payload.message || "Something went wrong");
      }
      return payload as SuccessfulResponse<UserAddresses>;
    },
    enabled: isAuthenticated,
  });

  return {
    isLoading: isAuthenticated ? isLoading : false,
    payload,
    isError,
    error,
    isAuthenticated,
  };
}
