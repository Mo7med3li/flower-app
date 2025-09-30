"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteAllNotifications } from "@/lib/actions/notifications/delete-all-notifications.action";

export function useDeleteAllNotifications() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: deleteAllNotifications,
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

  return { deletePending: isPending, allNotificationsDelete: mutate };
}
