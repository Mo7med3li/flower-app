"use client";

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
} from "@/lib/schema/change-password/change-password.schema";
import { Button } from "@/components/ui/button";

const ChangePasswordForm = () => {
  const form = useForm<ChangePasswordFormType>({
    defaultValues: {
      password: "",
      newPassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordFormType) => {
    console.log(data);
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-16">
          <section className="flex flex-col gap-8">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>Password</FormLabel>

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
              name="newPassword"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>New Password</FormLabel>

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
          </section>

          <Button type="submit" className="self-end">
            Change Password
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ChangePasswordForm;
