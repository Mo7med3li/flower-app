"use client";

import { toast } from "sonner";
import type { ContactFields } from "@/lib/schemas/contact.schema";

export default function useContact() {
  const sendMessage = (_values: ContactFields) => {
    toast.success(`Message sent successfully ${_values.name}, we will get back to you soon!`);
  };

  return { sendMessage };
}
