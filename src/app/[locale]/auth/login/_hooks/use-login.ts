// React & Next.js
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

// Libraries
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
// Schemas
import { LoginFields } from "@/lib/schemas/auth.schema";

export default function useLogin() {
  const searchParams = useSearchParams();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ username, password }: LoginFields) => {
      const response = await signIn("credentials", {
        username,
        password,
        redirect: false,
        callbackUrl: decodeURIComponent(searchParams.get("callbackUrl") || "/"),
      });

      if (response?.error) throw new Error(response.error);

      return response;
    },
    onSuccess: () => {
      toast.success("Login Successful");
    },
    onError: () => {
      toast.error("Login Failed");
    },
  });

  return { isPending, error, login: mutate };
}
