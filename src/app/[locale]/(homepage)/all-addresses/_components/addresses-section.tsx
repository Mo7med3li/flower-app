"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useFetchAddresses from "@/hooks/address/use-fetch-addresses";
import AddressSkeleton from "@/components/skeletons/address/address.skeleton";
import FormSteps from "@/app/components/address-model/form-steps";
import AddressCard from "@/app/components/address-model/address-card";
import AddressForm from "@/app/components/address-model/address-form";

export default function AddressesSection() {
  // Hooks
  const { isLoading, payload, error, isError } = useFetchAddresses();

  // States
  const [steps, setSteps] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);

  // Translations
  const t = useTranslations();

  return (
    <section className="px-4 md:px-20 py-10 bg-maroon-300/20 dark:bg-maroon-900/20">
      <div className="flex items-center justify-between py-2">
        <h2 className="font-bold text-3xl text-zinc-800 dark:text-zinc-50">{t("my-addresses")}</h2>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button variant="secondary">{t("add-a-new-address")}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[850px] ">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <FormSteps steps={steps} />
            <section>
              <AddressForm setSteps={setSteps} steps={steps} setOpenDialog={setOpenDialog} />
            </section>
          </DialogContent>
        </Dialog>
      </div>
      <section className="py-2 space-y-6">
        {/* overflow-y-scroll */}

        {/* Addresses */}
        {isLoading ? (
          <>
            <AddressSkeleton />
            <AddressSkeleton />
            <AddressSkeleton />
          </>
        ) : isError ? (
          <div className="flex items-center justify-center h-96">
            <p className="text-2xl font-semibold text-red-500">{error?.message}</p>
          </div>
        ) : payload?.addresses?.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <p className="text-2xl font-semibold text-zinc-800">{t("no-addresses-to-show")}</p>
          </div>
        ) : (
          payload?.addresses?.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              setSteps={setSteps}
              steps={steps}
              setOpenDialog={setOpenDialog}
            />
          ))
        )}
      </section>
    </section>
  );
}
