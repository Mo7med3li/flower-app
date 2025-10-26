"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import updateUserPhoto from "../_actions/update-user-photo";

const useUpdateProfilePhoto = () => {
  // hooks
  const queryClient = useQueryClient();

  // translations
  const t = useTranslations();

  // mutation
  const {
    mutateAsync: updateProfilePhotoMutation,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["update-profile-photo"],
    mutationFn: async (values: FormData) => await updateUserPhoto(values),
    onSuccess: () => {
      toast(t("profile-photo-updated-successfully"));
      queryClient.invalidateQueries({
        queryKey: ["user-data"],
      });
    },
    onError: (error) => {
      toast.error(error.message || t("failed-to-update-profile-photo"));
    },
  });
  return { updateProfilePhotoMutation, isPending, error };
};

export default useUpdateProfilePhoto;
