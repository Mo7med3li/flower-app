"use client";

import { useQuery } from "@tanstack/react-query";
import { APIResponse, SuccessfulResponse } from "@/lib/types/api";

export function useUnreadNotificationsCount() {
  const { data: payload, isLoading: unreadCountLoading } = useQuery({
    queryKey: ["UnreadNotifications"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/unread-notifications");

      const payload: APIResponse<SuccessfulResponse<UnreadNotificationsReadResponse>> =
        await response.json();

      if (!payload.status) {
        throw new Error(payload.message || "Something went wrong");
      }

      return payload;
    },
  });

  return { unreadCount: payload, unreadCountLoading };
}
