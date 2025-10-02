"use client";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { subscribeAction } from "@/lib/actions/subscribe/subscribe.action";

export default function useSubscribe() {
  // Mutations
  const { mutate: subscribeMutate, isPending } = useMutation({
    mutationFn: async (values: { email: string }) => {
      return await subscribeAction({ email: values.email });
    },
    onSuccess(data) {
      toast.success(data.message);
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    },
  });

  return { subscribeMutate, isPending };
}
