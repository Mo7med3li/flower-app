"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProfileAction } from "../_actions/update-profile.action";

const useUpdateProfile = () => {
  // hooks
  const queryClient = useQueryClient();
  const {
    mutateAsync: updateProfileMutation,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (values: UpdateProfileFields) => await updateProfileAction(values),
    onSuccess: () => {
      toast("Profile updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["user-data"],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
  return { updateProfileMutation, isPending, error };
};

export default useUpdateProfile;
