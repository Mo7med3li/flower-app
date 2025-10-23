"use client";

import { Loader2 } from "lucide-react";
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
import useUpdateProfile from "../_hooks/use-update-profile";

const UpdateUserForm = ({ user }: { user: ApplicationUser }) => {
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

  // functions handlers
  function onSubmit(values: UpdateProfileFields) {
    updateProfileMutation(values);
  }
  return (
    <div className="w-full">
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
                    <FormLabel>First Name</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
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
                    <FormLabel>Last Name</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
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
                    <FormLabel>Email</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input placeholder="user@example.com" {...field} />
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
                    <FormLabel>Phone</FormLabel>

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
                    <FormLabel>Gender</FormLabel>

                    {/* Field */}
                    <Select onValueChange={field.onChange} disabled defaultValue={user.gender}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
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
        <Button type="button" variant="outline" className="border-none shadow-none">
          Delete Account
        </Button>
        <Button type="submit" onClick={() => onSubmit(form.getValues())}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default UpdateUserForm;
