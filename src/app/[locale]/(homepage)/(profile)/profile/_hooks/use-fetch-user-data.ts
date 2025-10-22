"use client";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../_api/get-user-data";

export function useFetchUserData() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const response = await getUserData();
      return response;
      // const response = await fetch("http://localhost:3000/api/user-data");
      // const payload: APIResponse<UserDataResponse> = await response.json();
      // if ("error" in payload) {
      //   throw new Error(payload.error);
      // }
      // return payload;
    },
  });

  return { data, isLoading, error };
}
