import { useTranslations } from "next-intl";
import { z } from "zod";

export const useUpdateProfileSchema = () => {
  const t = useTranslations();

  return z.object({
    firstName: z.string().min(1, { message: t("firstname-required") }),
    lastName: z.string().min(1, { message: t("lastname-required") }),
    email: z
      .string()
      .min(1, { message: t("email-required") })
      .email({
        message: t("email-invalid"),
      }),
    phone: z.string().optional(),
    gender: z.enum(["male", "female", "MALE", "FEMALE"]).optional(),
  });
};

export type UpdateProfileFieldsSchema = z.infer<ReturnType<typeof useUpdateProfileSchema>>;
