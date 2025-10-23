"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../_api/get-user-data";

export function useFetchUserData() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const response = await getUserData();
      return response;
    },
  });

  return { data, isLoading, error };
}
