"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Link } from "@/i18n/navigation";

import {
  RegistrationFields,
  useRegisterSchema,
  SendVerificationFields,
  useSendVerificationSchema,
  ConfirmVerificationFields,
  useConfirmVerificationSchema,
} from "@/lib/schemes/auth.schema";

import useRegister from "../_hook/use-register";
import useSendEmailVerification from "../_hook/use-send-email";
import useConfirmEmailVerification from "../_hook/use-confirm-email";

export default function RegisterForm() {
  const t = useTranslations();

  // Stepper State
  const [step, setStep] = useState(1);
  const [verifiedEmail, setVerifiedEmail] = useState("");

  // Hooks
  const { sendVerificationAsync, isPending: isSending } = useSendEmailVerification();
  const { confirmVerificationAsync, isPending: isConfirming } = useConfirmEmailVerification();
  const { registerAsync, isPending: isRegistering } = useRegister();

  // Schemas
  const sendVerificationSchema = useSendVerificationSchema();
  const confirmSchema = useConfirmVerificationSchema();
  const registerSchema = useRegisterSchema();

  // -- step 1: send email --
  const form1 = useForm<SendVerificationFields>({
    resolver: zodResolver(sendVerificationSchema),
    defaultValues: { email: "" },
  });

  const onStep1Submit = async (values: SendVerificationFields) => {
    try {
      await sendVerificationAsync(values);
      setVerifiedEmail(values.email);
      setStep(2);
    } catch (e) {
      // hook handles toast
      toast.error(e instanceof Error ? e.message : "Failed to send verification email.");
    }
  };

  // -- step 2: confirm code --
  const form2 = useForm<ConfirmVerificationFields>({
    resolver: zodResolver(confirmSchema),
    defaultValues: { email: "", code: "" },
  });

  // sync email to form2 when it's available
  useEffect(() => {
    if (verifiedEmail) {
      form2.setValue("email", verifiedEmail);
    }
  }, [verifiedEmail, form2]);

  const onStep2Submit = async (values: ConfirmVerificationFields) => {
    try {
      await confirmVerificationAsync({ email: verifiedEmail, code: values.code });
      setStep(3);
    } catch (e) {
      // hook handles toast
      toast.error(e instanceof Error ? e.message : "Failed to confirm email.");
    }
  };

  // -- step 3: register details --
  const form3 = useForm<RegistrationFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: undefined,
      password: "",
      confirmPassword: "",
    },
  });

  // sync email to form3
  useEffect(() => {
    if (verifiedEmail) {
      form3.setValue("email", verifiedEmail);
    }
  }, [verifiedEmail, form3]);

  const onStep3Submit = async (values: RegistrationFields) => {
    try {
      await registerAsync({ ...values, email: verifiedEmail });
    } catch (e) {
      // hook handles toast
      toast.error(e instanceof Error ? e.message : "Failed to register.");
    }
  };

  // Helper render for navigation links
  const renderFooterLinks = () => (
    <p className="font-primary font-medium text-sm text-center mt-6">
      {t("already-have-an-account")}{" "}
      <span className="text-maroon-500 font-bold">
        <Link href={"/auth/login"}>{t("login")}</Link>
      </span>
    </p>
  );

  return (
    <div className="w-full">
      {/* STEP 1 */}
      {step === 1 && (
        <Form {...form1}>
          <form onSubmit={form1.handleSubmit(onStep1Submit)} className="space-y-6">
            <p className="text-sm text-gray-500 pb-2">
              Step 1 of 3: Verify your email address to begin
            </p>
            <FormField
              control={form1.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input placeholder="user@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSending}>
              {isSending ? "Sending code..." : "Send Verification Code"}
            </Button>
            {renderFooterLinks()}
          </form>
        </Form>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <Form {...form2}>
          <form onSubmit={form2.handleSubmit(onStep2Submit)} className="space-y-6">
            <p className="text-sm text-gray-500 pb-2">
              Step 2 of 3: Enter the OTP sent to <b>{verifiedEmail}</b>
            </p>
            <FormField
              control={form2.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="flex justify-between w-full gap-2">
                        <InputOTPSlot index={0} className="w-full h-12 text-lg" />
                        <InputOTPSlot index={1} className="w-full h-12 text-lg" />
                        <InputOTPSlot index={2} className="w-full h-12 text-lg" />
                        <InputOTPSlot index={3} className="w-full h-12 text-lg" />
                        <InputOTPSlot index={4} className="w-full h-12 text-lg" />
                        <InputOTPSlot index={5} className="w-full h-12 text-lg" />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isConfirming}>
              {isConfirming ? "Confirming..." : "Confirm Email"}
            </Button>
            <Button type="button" variant="link" className="w-full" onClick={() => setStep(1)}>
              Change Email
            </Button>
            {renderFooterLinks()}
          </form>
        </Form>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <Form {...form3}>
          <form onSubmit={form3.handleSubmit(onStep3Submit)} className="space-y-6">
            <p className="text-sm text-gray-500 pb-2">Step 3 of 3: Finalize your account details</p>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <FormField
                  control={form3.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1">
                <FormField
                  control={form3.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("frist-name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("placeholder-frist-name")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1">
                <FormField
                  control={form3.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("last-name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("placeholder-last-name")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form3.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="user@example.com"
                          {...field}
                          disabled
                          className="bg-gray-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form3.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("phone")}</FormLabel>
                      <FormControl>
                        <PhoneInput placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form3.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("gender")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("select-gender")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MALE">{t("male")}</SelectItem>
                          <SelectItem value="FEMALE">{t("female")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form3.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("password")}</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form3.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("confirm-password")}</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isRegistering || (form3.formState.isSubmitted && !form3.formState.isValid)}
            >
              {isRegistering ? "Registering..." : t("register")}
            </Button>

            {renderFooterLinks()}
          </form>
        </Form>
      )}
    </div>
  );
}
