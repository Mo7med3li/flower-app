"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { updateProfileAction } from "../_actions/update-profile.action";

const useUpdateProfile = () => {
  // translations
  const t = useTranslations();

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
      toast(t("profile-updated-successfully"));
      queryClient.invalidateQueries({
        queryKey: ["user-data"],
      });
    },
    onError: (error) => {
      toast.error(error.message || t("failed-to-update-profile"));
    },
  });
  return { updateProfileMutation, isPending, error };
};

export default useUpdateProfile;
