"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRegisterSchema } from "@/lib/schemes/auth.schema";
import DeleteModel from "@/app/[locale]/dashboard/_components/delete-model";
import useUpdateProfile from "../_hooks/use-update-profile";
import UserPhotoSection from "./user-photo-section";
import useDeleteAccount from "../_hooks/use-delete-account";

const UpdateUserForm = ({ user }: { user: ApplicationUser }) => {
  // translations
  const t = useTranslations();

  // forms
  const form = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    },
    resolver: zodResolver(useRegisterSchema()),
  });

  // hooks
  const { updateProfileMutation, isPending, error } = useUpdateProfile();
  const { deleteAccountMutation, isPending: isDeletePending } = useDeleteAccount();

  // functions handlers
  function onSubmit(values: UpdateProfileFields) {
    updateProfileMutation(values);
  }
  return (
    <div className="w-full space-y-6">
      {/* user photo section */}
      <UserPhotoSection user={user} />

      {/* form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
          <div className="grid grid-cols-2 gap-3">
            {/* first name */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>{t("first-name")}</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input placeholder={t("first-name")} {...field} />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* last name */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>{t("last-name")}</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input placeholder={t("last-name")} {...field} />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>{t("email")}</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input placeholder={t("email")} {...field} />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Phone */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>{t("phone")}</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <PhoneInput placeholder="(123) 456-7890" {...field} />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Gender */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>{t("gender")}</FormLabel>

                    {/* Field */}
                    <Select onValueChange={field.onChange} disabled defaultValue={user.gender}>
                      <FormControl dir="ltr">
                        <SelectTrigger>
                          <SelectValue placeholder={t("select-gender")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem dir="ltr" value="male">
                          {t("male")}
                        </SelectItem>
                        <SelectItem dir="ltr" value="female">
                          {t("female")}
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* error */}
            {error && <p className="text-red-500">{error.message}</p>}
          </div>
        </form>
      </Form>

      {/* Actions */}
      <div className="flex justify-between pt-16">
        <DeleteModel
          deleteFn={() => deleteAccountMutation()}
          name={t("account")}
          isPending={isDeletePending}
        />

        <Button type="submit" onClick={() => onSubmit(form.getValues())}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t("save-changes")}
        </Button>
      </div>
    </div>
  );
};

export default UpdateUserForm;
