import { useTranslations } from "next-intl";
import { z } from "zod";

export const useSendVerificationSchema = () => {
  const t = useTranslations();
  return z.object({
    email: z
      .string()
      .min(1, { message: t("email-required") })
      .email({ message: t("email-invalid") }),
  });
};

export type SendVerificationFields = z.infer<ReturnType<typeof useSendVerificationSchema>>;

export const useConfirmVerificationSchema = () => {
  const t = useTranslations();
  return z.object({
    email: z
      .string()
      .min(1, { message: t("email-required") })
      .email({ message: t("email-invalid") }),
    code: z.string().min(1, { message: t("code-required") || "Code is required" }),
  });
};

export type ConfirmVerificationFields = z.infer<ReturnType<typeof useConfirmVerificationSchema>>;

export const useRegisterSchema = () => {
  // Translation
  const t = useTranslations();

  return z
    .object({
      username: z.string().min(1, { message: t("username_required") || "Username is required" }),
      firstName: z.string().min(1, { message: t("firstname-required") }),
      lastName: z.string().min(1, { message: t("lastname-required") }),
      email: z
        .string()
        .min(1, { message: t("email-required") })
        .email({
          message: t("email-invalid"),
        }),
      phone: z.string().optional(),
      gender: z.enum(["male", "female", "MALE", "FEMALE"], {
        message: t("gender-required"),
      }),
      password: z
        .string()
        .min(1, { message: t("password-required") })
        .min(8, {
          message: t("password-min", { min: 8 }),
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("password-mismatch"),
      path: ["confirmPassword"],
    });
};

export type RegistrationFields = z.infer<ReturnType<typeof useRegisterSchema>>;

// Existing schema
export const useAddCategoryFormSchema = () => {
  // Translation
  const t = useTranslations();

  return z.object({
    name: z.string().min(1, { message: t("add-category-name") }),
    image: z.any(),
  });
};

export type AddCategoryFormType = z.infer<ReturnType<typeof useAddCategoryFormSchema>>;

// Add the missing login schema
export const useLoginSchema = () => {
  // Translation
  const t = useTranslations();

  return z.object({
    username: z.string().min(1, { message: t("username_required") || "Username is required" }),
    password: z
      .string()
      .min(1, { message: t("password_required") || "Password is required" })
      .min(6, { message: t("password_min_length") || "Password must be at least 6 characters" }),
  });
};

export type LoginFields = z.infer<ReturnType<typeof useLoginSchema>>;
