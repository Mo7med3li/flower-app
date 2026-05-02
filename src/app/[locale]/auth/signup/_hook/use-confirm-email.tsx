import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ConfirmVerificationFields } from "@/lib/schemas/auth.schema";
import { confirmEmailVerificationAction } from "../_action/confirm-email.action";

export default function useConfirmEmailVerification() {
  const { isPending, error, mutate, mutateAsync } = useMutation({
    mutationFn: async (fields: ConfirmVerificationFields) =>
      await confirmEmailVerificationAction(fields),
    onSuccess: () => {
      toast.success("Email verified successfully.");
    },
    onError: (e) => {
      toast.error(e.message || "Failed to confirm email.");
    },
  });

  return { isPending, error, confirmVerification: mutate, confirmVerificationAsync: mutateAsync };
}
