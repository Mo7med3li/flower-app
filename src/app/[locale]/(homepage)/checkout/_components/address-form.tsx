"use client";

import { useState } from "react";
import { useFormatter } from "next-intl";
import { Address } from "@/lib/types/addresses";
import { cn } from "@/lib/utils";
import AddressStep1 from "./address-step1";
import AddressStep2 from "./address-step2";

export default function AddressForm() {
  // hook
  const [step, setStep] = useState<number>(1);
  const [address, setAddress] = useState<object>({});

  // translation
  const format = useFormatter();

  return (
    <>
      <div className="flex flex-col gap-6 h-[675px] py-3">
        {/* Progress Bar */}
        <div className="w-full relative bg-zinc-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
          <div
            className={cn(
              "bg-maroon-600 dark:bg-soft-pink-500 h-1.5 rounded-full transition-all duration-700",
              step === 1 && "w-1/3",
              step === 2 && "w-2/3",
            )}
          />
          <div className="absolute inset-0 -top-[9px] flex justify-evenly">
            <span className="bg-maroon-600 dark:bg-soft-pink-500 font-semibold text-sm rounded-full text-white w-5 h-5 flex justify-center items-center ">
              {format.number(1, "number-base")}
            </span>
            <span className="bg-maroon-600 dark:bg-soft-pink-500 font-semibold text-sm rounded-full text-white w-5 h-5 flex justify-center items-center ">
              {format.number(2, "number-base")}
            </span>
          </div>
        </div>
        {step === 1 ? (
          <AddressStep1
            step={step}
            setStep={setStep}
            setAddress={setAddress}
            address={address as Address}
          />
        ) : step === 2 ? (
          <AddressStep2 step={step} setStep={setStep} address={address as Address} />
        ) : null}
      </div>
    </>
  );
}
