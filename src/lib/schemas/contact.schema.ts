import { useTranslations } from "next-intl";
import { z } from "zod";

export const CONTACT_SUBJECTS = [
  "order",
  "delivery",
  "custom",
  "partnership",
  "other",
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

export const useContactSchema = () => {
  const t = useTranslations("contact-page");

  return z.object({
    name: z.string().min(1, { message: t("name-required") }),
    email: z
      .string()
      .min(1, { message: t("email-required") })
      .email({ message: t("email-invalid") }),
    phone: z.string().optional(),
    subject: z.enum(CONTACT_SUBJECTS, { message: t("subject-required") }),
    message: z
      .string()
      .min(1, { message: t("message-required") })
      .min(10, { message: t("message-min") }),
  });
};

export type ContactFields = z.infer<ReturnType<typeof useContactSchema>>;
