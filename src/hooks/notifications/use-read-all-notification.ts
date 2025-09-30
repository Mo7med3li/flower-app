"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { readAllNotifications } from "@/lib/actions/notifications/read-all-notifications.action";

export function useReadAllNotifications() {
  const queryClient = useQueryClient();
  const { isPending, error, mutate } = useMutation({
    mutationFn: readAllNotifications,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["UnreadNotifications"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { readPending: isPending, error, readAllNotificationsMutate: mutate };
}
