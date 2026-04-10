import z from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ error: "Current password is required" })
      .min(1, "Current password is required"),

    newPassword: z
      .string({ error: "Password is required" })
      .min(1, "Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/,
        "Password must be at least 8 characters include at least 1 upper, 1 lower, and number.",
      ),
    confirmPassword: z
      .string({ error: "Confirm password is required" })
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
// type
export type ChangePasswordFormType = z.infer<typeof changePasswordSchema>;
