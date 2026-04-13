import { useTranslations } from "next-intl";
import { z } from "zod";

export const useResetPasswordSchema = () => {
  // Translation
  const t = useTranslations();
  return z
    .object({
      token: z.string().min(1, { message: t("token-required") }),
      newPassword: z
        .string()
        .min(1, { message: t("password-requred-reset-password") })
        .min(8, { message: t("password-min") })
        .max(50, { message: t("password-max") })
        .regex(/[A-Z]/, { message: t("password-upercase") })
        .regex(/[a-z]/, { message: t("password-lowercase") })
        .regex(/[0-8]/, { message: t("password-number") })
        .regex(/[^A-Za-z0-8]/, { message: t("password-special") }),

      confirmPassword: z.string().min(1, { message: t("confirm-password-required") }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("password-mismatch"),
      path: ["confirmPassword"],
    });
};

export type ResetPasswordFields = z.infer<ReturnType<typeof useResetPasswordSchema>>;
