"use client";

import { useQuery } from "@tanstack/react-query";

export function useUnreadNotificationsCount() {
  const { data: payload } = useQuery({
    queryKey: ["UnreadNotifications"],
    queryFn: async () => {
      const response = await fetch("/unread-notifications");

      const payload: APIResponse<UnreadNotificationsReadResponse> = await response.json();

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
  });

  return { unreadCount: payload };
}
