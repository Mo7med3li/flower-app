"use client";

// React & Next.js
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";

// Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Alert } from "@/components/ui/alert";

// UI Components
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Schemas & Types
import { LoginFields, useLoginSchema } from "@/lib/schemas/auth.schema";

// Hooks & Utils
import { cn } from "@/lib/utils/cn";
import useLogin from "../_hooks/use-login";

export default function LoginForm() {
  // Hooks
  const t = useTranslations();
  const LoginSchema = useLoginSchema();
  const { login, error, isPending } = useLogin();

  // Form setup with validation
  const form = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handles form submission for user login
  async function onSubmit(values: LoginFields) {
    login(values, {
      onSuccess: (data) => {
        // Redirect to the callback URL after a successful login
        window.location.href = data?.url || "/";
      },
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full pt-6 pb-9 border-y border-zinc-200 dark:border-zinc-600"
        >
          {/* Email Input field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>UserName</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("username_placeholder")}
                    autoComplete="username"
                    className={cn(
                      fieldState.error ? "border-red-500 focus:border-none" : "border-borderGray",
                      "rounded-lg h-12 placeholder:text-neutralGray bg-lightGray shadow-secondary",
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Input field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="new-password"
                    placeholder={t("password_placeholder")}
                    type="password"
                    className={cn(
                      fieldState.error ? "border-red-500 focus:border-none" : "border-borderGray",
                      "rounded-lg h-12 placeholder:text-neutralGray bg-lightGray shadow-secondary",
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Form actions & links */}
          <div className="flex flex-col">
            <Link
              className="no-underline text-end -mt-2 text-maroon-700 dark:text-soft-pink-300 font-semibold"
              href="/auth/forget-password"
            >
              {t("forgot_password")}
            </Link>

            {error?.message && <p className="text-red-500 text-sm mt-2">{error?.message}</p>}

            <Button
              type="submit"
              className="w-full h-10 font-semibold mt-8 rounded-xl bg-maroon-600 text-white hover:bg-maroon-800"
              disabled={isPending}
            >
              {isPending ? t("logging_in") : t("login_button")}
            </Button>
          </div>
        </form>
      </Form>

      <Button
        className="w-full h-10 font-semibold mt-8 rounded-xl flex items-center justify-center bg-maroon-600 text-white hover:bg-maroon-800"
        onClick={() => signIn("google")}
        type="button"
      >
        <Mail className="mr-2 h-4 w-4" />
        Sign in with Google
      </Button>

      <Alert variant="warning" className="mt-4">
        <p>
          The backend doesn&apos;t support login with Google, so the token will be invalid. This is
          just for UI development purposes. You will be able to log in, but you won&apos;t be able
          to use any features that require authentication.
        </p>
      </Alert>
    </>
  );
}
