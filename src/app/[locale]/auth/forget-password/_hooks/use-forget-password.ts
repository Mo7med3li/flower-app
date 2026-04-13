import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { ForgetPasswordFields } from "@/lib/schemes/forget-password.schema";
import forgetPasswordAction from "../_actions/forget-password.action";

export default function useForgetPassword() {
  // Translation
  const t = useTranslations();

  // Create mutation
  const { isPending, error, mutate } = useMutation({
    // When mutation runs
    mutationFn: async (fields: ForgetPasswordFields) => {
      const payload = await forgetPasswordAction(fields);

      return payload;
    },

    onSuccess: () => {
      // On success toast
      toast.success(t("link-sent-to-your-email-successfully"));
    },
    onError: () => {
      // On Error toast
      toast.error(t("failed-to-send-link-to-your-email"));
    },
  });

  return { isPending, error, forgetPassword: mutate };
}
