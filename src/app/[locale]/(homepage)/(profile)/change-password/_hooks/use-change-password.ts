import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { ChangePasswordFormType } from "@/lib/schemas/change-password/change-password.schema";
import changePasswordAction from "../_actions/change-password.action";

const useChangePassword = () => {
  const {
    mutate: changePasswordMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (values: ChangePasswordFormType) => await changePasswordAction(values),
    onSuccess: () => {
      toast.success("Password changed successfully");
      setTimeout(() => {
        signOut();
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { changePasswordMutation, isPending, isError };
};
export default useChangePassword;
