"use client";

import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ChangePasswordFormType,
  changePasswordSchema,
} from "@/lib/schemas/change-password/change-password.schema";
import { Button } from "@/components/ui/button";
import useChangePassword from "../_hooks/use-change-password";

const ChangePasswordForm = () => {
  // translations
  const t = useTranslations();

  // hooks
  const { changePasswordMutation, isPending, isError } = useChangePassword();

  // form
  const form = useForm<ChangePasswordFormType>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  //   submit handler
  const onSubmit = (data: ChangePasswordFormType) => {
    changePasswordMutation(data);
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-16">
          <section className="flex flex-col gap-8">
            {/* Password */}
            <FormField
              name="currentPassword"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>{t("password")}</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input {...field} type="password" placeholder="*********" />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* New Password */}
            <FormField
              name="newPassword"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>{t("new-password")}</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input {...field} type="password" placeholder="*********" />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>{t("new-password")}</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input {...field} type="password" placeholder="*********" />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Error */}
            {isError && (
              <p className="text-red-500">{form.formState.errors.newPassword?.message}</p>
            )}
          </section>

          <Button type="submit" className="self-end" disabled={isPending} isLoading={isPending}>
            {t("change-password")}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ChangePasswordForm;
