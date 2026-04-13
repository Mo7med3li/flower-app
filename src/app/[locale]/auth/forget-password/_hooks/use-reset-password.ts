import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ResetPasswordFields } from "@/lib/schemes/reset-password.schema";
import resetPasswordAction from "../_actions/reset-password.action";

export default function useResetPassword() {
  // Translation
  const t = useTranslations();

  // Create mutation
  const { isPending, error, mutate } = useMutation({
    // When mutation runs
    mutationFn: async (fields: ResetPasswordFields) => {
      const payload = await resetPasswordAction(fields);

      return payload;
    },

    onSuccess: () => {
      // On success toast
      toast.success(t("reset-success"));
    },
    onError: () => {
      // On error toast
      toast.error(t("reset-error"));
    },
  });

  return { isPending, error, resetPassword: mutate };
}
