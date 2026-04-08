import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { RegistrationFields } from "@/lib/schemes/auth.schema";
import { registerAction } from "../_action/register.action";

export default function useRegister() {
  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mutation
  const { isPending, error, mutate, mutateAsync } = useMutation({
    mutationFn: async (fields: RegistrationFields) => await registerAction(fields),
    onSuccess: () => {
      toast.success("Registration successful!");
      // Redirect to the login page upon successful registration
      router.push(`/auth/login?${searchParams.toString()}`);
    },
    onError: (e) => {
      toast.error(e.message || "Failed to register.");
    },
  });

  return { isPending, error, register: mutate, registerAsync: mutateAsync };
}
