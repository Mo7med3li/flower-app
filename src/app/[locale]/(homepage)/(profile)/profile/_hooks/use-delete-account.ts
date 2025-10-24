import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import deleteAccount from "../_actions/delete-account";
const useDeleteAccount = () => {
  // translations
  const t = useTranslations();

  // hooks
  const queryClient = useQueryClient();

  // mutation
  const {
    mutateAsync: deleteAccountMutation,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["delete-account"],
    mutationFn: async () => await deleteAccount(),
    onSuccess: () => {
      toast(t("account-deleted-successfully"));
      setTimeout(() => {
        signOut();
      }, 1000);
      queryClient.invalidateQueries({
        queryKey: ["user-data"],
      });
    },
    onError: (error) => {
      toast.error(error.message || t("failed-delete-account"));
    },
  });
  return { deleteAccountMutation, isPending, error };
};

export default useDeleteAccount;
