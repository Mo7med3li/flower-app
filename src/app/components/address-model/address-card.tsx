import { LocationEdit, PenLine, Phone, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Address } from "@/lib/types/user-addresses";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AddressDeleteModel from "./address-delete-model";
import FormSteps from "./form-steps";
import AddressForm from "./address-form";

export default function AddressCard({
  steps,
  setSteps,
  address,
}: {
  steps: number;
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  address: Address;
}) {
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <section>
      <div className="border border-zinc-300 pt-6 pb-5 pe-9 ps-4 space-y-4 rounded-xl relative ">
        <div className="absolute start-1/2 top-0 -translate-y-1/2 rtl:translate-x-1/2">
          <div className="flex flex-col items-center gap-1">
            <Badge
              variant="outline"
              className="text-xs font-semibold text-white bg-gradient-to-r from-maroon-600 to-maroon-700 border-0 px-3 py-1 shadow-md"
            >
              {address.title}
            </Badge>
            {address.isPrimary && (
              <Badge className="text-xs font-medium bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 px-2 py-0.5 shadow-sm">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  Primary
                </div>
              </Badge>
            )}
          </div>
        </div>
        <div className="absolute start-full space-y-2 -translate-x-1/2 rtl:translate-x-1/2">
          <Dialog open={openEdit} modal={true} onOpenChange={setOpenEdit}>
            {/* Edit Dialog */}
            <DialogTrigger>
              <Button className=" bg-zinc-50 size-9 rounded-full flex items-center justify-center border border-zinc-400 cursor-pointer">
                <PenLine className="text-zinc-800" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[850px] max-w-full h-4/3 max-h-4/3 overflow-hidden max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              {/* Form */}
              <div className="py-4 overflow-y-auto">
                <FormSteps steps={steps} address={address} />
                <AddressForm
                  setOpenDialog={setOpenEdit}
                  setSteps={setSteps}
                  steps={steps}
                  address={address}
                />
              </div>
            </DialogContent>
          </Dialog>

          {/* Delete Dialog */}

          <Dialog>
            <DialogTrigger asChild>
              <Button className=" bg-red-600 dark:bg-soft-pink-300 size-9 rounded-full flex items-center justify-center top-20">
                <Trash2 className="text-white" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[500px] h-[373px] ">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>

              <AddressDeleteModel id={address.id} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-[10px] col-span-1">
            <LocationEdit
              width={33}
              height={33}
              fill="#fff"
              className="bg-emerald-500 rounded-full p-[5px]"
            />
            <span className="font-semibold text-2xl text-zinc-800 dark:text-zinc-50">
              {address.city}
            </span>
          </div>
          <div className="flex items-center rtl:flex-row-reverse gap-[10px] col-span-1">
            <Phone width={33} height={33} className="p-1" />
            <span className="font-medium text-lg text-zinc-600 dark:text-zinc-50">
              {address.phone}
            </span>
          </div>
        </div>
        <div className="bg-zinc-100 py-1 px-3 w-fit rounded-md">
          <span className="font-medium text-base text-zinc-800 ">{address.street}</span>
        </div>
      </div>
    </section>
  );
}
