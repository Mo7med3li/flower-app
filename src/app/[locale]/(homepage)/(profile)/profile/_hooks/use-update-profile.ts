"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import { UpdateProfileFields } from "@/lib/types/api";
import { updateProfileAction } from "../_actions/update-profile.action";

const useUpdateProfile = () => {
  // translations
  const t = useTranslations();
  const { update } = useSession();
  const router = useRouter();
  // hooks
  const queryClient = useQueryClient();
  const {
    mutateAsync: updateProfileMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (values: UpdateProfileFields) => await updateProfileAction(values),
    mutationKey: ["update-profile"],
    onSuccess: async (data) => {
      toast(t("profile-updated-successfully"));
      await update({ user: { ...data?.payload?.user } });
      router.refresh();
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
