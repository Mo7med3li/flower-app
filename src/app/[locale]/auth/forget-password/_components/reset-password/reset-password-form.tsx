"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResetPasswordFields, useResetPasswordSchema } from "@/lib/schemes/reset-password.schema";
import { cn } from "@/lib/utils/cn";
import useResetPassword from "../../_hooks/use-reset-password";

export default function ResetPasswordForm() {
  // Hooks
  const { isPending, resetPassword, error } = useResetPassword();
  const router = useRouter();

  // Translation
  const t = useTranslations();

  // Initializing react hook form
  const schema = useResetPasswordSchema();
  const form = useForm<ResetPasswordFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      token: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  //Functions
  const onSubmit: SubmitHandler<ResetPasswordFields> = (values: ResetPasswordFields) => {
    resetPassword(values, {
      onSuccess: () => {
        router.push("/auth/login");
      },
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 border-t-2 border-b-2 pt-6 pb-9 mb-5 mt-4"
        >
          {/* Token field */}
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => {
              const hasError = form.formState.errors.token;
              return (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("token")}</FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={t("please-enter-your-token-from-email-link")}
                      {...field}
                      className={cn(
                        "border-2 focus-visible:ring-0 focus-visible:ring-offset-0",
                        hasError && "border-red-500",
                      )}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>

                  {/* Error message */}
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/* New password field */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => {
              const hasError = form.formState.errors.newPassword;
              return (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("password-reset-password")}</FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      className={cn(
                        hasError
                          ? "border-maroon-600 focus-visible:ring-red-600 dark:border-soft-pink-600 dark:focus-visible:ring-red-500"
                          : "",
                        "",
                      )}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>

                  {/* Error message */}
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* New re password field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => {
              const hasError = form.formState.errors.confirmPassword;

              return (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("confirm-password-reset-password")}</FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      className={cn(
                        hasError &&
                          "border-maroon-600 focus-visible:ring-red-600 dark:border-soft-pink-600 dark:focus-visible:ring-red-500",
                      )}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>

                  {/* Error message */}
                  <FormMessage />
                  {error && (
                    <p className="font-medium text-destructive dark:text-red-500 text-sm mt-2">
                      {error.message}
                    </p>
                  )}
                </FormItem>
              );
            }}
          />

          {/* Reset password button */}
          <Button
            type="submit"
            className="mt-9 w-full"
            isLoading={isPending}
            disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)}
          >
            {t("reset-password-button")}
          </Button>
        </form>
      </Form>
    </>
  );
}
