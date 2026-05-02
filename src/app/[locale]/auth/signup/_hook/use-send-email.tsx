import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SendVerificationFields } from "@/lib/schemas/auth.schema";
import { sendEmailVerificationAction } from "../_action/send-email.action";

export default function useSendEmailVerification() {
  const { isPending, error, mutate, mutateAsync } = useMutation({
    mutationFn: async (fields: SendVerificationFields) => await sendEmailVerificationAction(fields),
    onSuccess: () => {
      toast.success("Verification code sent to your email.");
    },
    onError: (e) => {
      toast.error(e.message || "Failed to send verification email.");
    },
  });

  return { isPending, error, sendVerification: mutate, sendVerificationAsync: mutateAsync };
}
