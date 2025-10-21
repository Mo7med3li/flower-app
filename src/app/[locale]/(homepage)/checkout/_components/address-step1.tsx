"use client";

// import { useQuery } from "@tanstack/react-query";
import { MoveRight } from "lucide-react";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Address } from "@/lib/types/addresses";
import { cn } from "@/lib/utils";
import LoadingSpin from "@/components/common/loading-spin";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormSteps from "@/app/components/addres-model/form-steps";
import AdrdessForm from "@/app/components/addres-model/address-form";
import useFetchAddresses from "@/hooks/address/use-fetch-addresses";
import Addresscard from "@/app/components/addres-model/address-card";

// Types
interface AddressStep1Props {
  step: number;
  address: Address;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setAddress: React.Dispatch<React.SetStateAction<object>>;
}

export default function AddressStep1({ step, address, setStep, setAddress }: AddressStep1Props) {
  // Hook
  const [isActive, setIsActive] = useState<boolean>(false);

  // Query to fetch addresses
  const { isLoading, payload: data, error } = useFetchAddresses();

  // Formatter and translations
  const t = useTranslations();
  const locale = useLocale();

  // States
  const [steps, setSteps] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);

  // Handle loading and error states
  if (isLoading) return <LoadingSpin />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {/* Title  Shipping Address */}
      <h3 className="font-primary font-semibold text-3xl">{t("checkout.shipping-address")}</h3>

      {/* content  */}
      <div className="flex flex-col gap-2 h-[675px] overflow-y-scroll">
        {/* address list */}
        {data?.addresses.map((addressMap: Address) => (
          // Address check button
          <button
            key={addressMap._id}
            onClick={() => {
              setAddress(addressMap);
              setIsActive(true);
            }}
            className={cn(
              " flex flex-col gap-2 p-5 rounded-xl relative hover:dark:bg-maroon-600 transition-colors",
              isActive && address._id === addressMap._id
                ? "bg-maroon-600 text-white dark:bg-soft-pink-500"
                : "hover:bg-zinc-50",
            )}
          >
            <Addresscard
              address={addressMap}
              steps={steps}
              setSteps={setSteps}
              setOpenDialog={setOpenDialog}
            />
          </button>
        ))}
      </div>

      {/* add address */}
      <div className="flex flex-col gap-5 py-5">
        {/* Or */}
        <div className="w-full relative bg-zinc-100 rounded-full h-[1px] dark:bg-gray-700 text-center">
          <span className="absolute w-auto px-2 -top-3 bg-white text-lg font-semibold text-zinc-500 dark:text-white dark:bg-zinc-800">
            {t("checkout.or")}
          </span>
        </div>

        {/* Button add address */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild className="w-full">
            <Button variant="secondary">{t("add-a-new-address")}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[850px] ">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <FormSteps steps={steps} />
            <section>
              <AdrdessForm setSteps={setSteps} steps={steps} setOpenDialog={setOpenDialog} />
            </section>
          </DialogContent>
        </Dialog>
      </div>

      {/* Next Button */}
      <Button
        onClick={() => {
          if (step < 2) setStep(step + 1);
        }}
        disabled={isActive ? false : true}
        className={cn("self-end w-[152px] disabled:dark:bg-zinc-500 ", step === 2 && "hidden")}
      >
        {t("checkout.next")}
        {locale === "ar" ? <MoveRight className="rotate-180" /> : <MoveRight />}
      </Button>
    </>
  );
}
