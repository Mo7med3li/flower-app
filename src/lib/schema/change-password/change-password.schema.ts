import z from "zod";

export const changePasswordSchema = z
  .object({
    password: z
      .string({ error: "Password is required" })
      .min(1, "Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/,
        "Password must be at least 8 characters include at least 1 upper, 1 lower, and number.",
      ),
    newPassword: z.string({ error: "New Password is required" }).min(1, "New Password is required"),
  })
  .refine((values) => values.password === values.newPassword, {
    message: "password do not match",
    path: ["newPassword"],
  });
export type ChangePasswordFormType = z.infer<typeof changePasswordSchema>;
