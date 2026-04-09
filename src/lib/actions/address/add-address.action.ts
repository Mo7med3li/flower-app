"use server";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { AddDressFormType } from "@/lib/schema/address-model/address-form.schema";
import { UserAddresses } from "@/lib/types/user-addresses";
import { getTokenHeader } from "@/lib/utils/token-header";

export async function addAddress({ values }: { values: AddDressFormType }) {
  const token = await getTokenHeader();

  const response = await fetch(`${process.env.API}/addresses`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify({
      ...values,
      latitude: Number(values.latitude),
      longitude: Number(values.longitude),
    }),
  });

  const payload: APIResponse<UserAddresses> = await response.json();

  if (!payload.status) {
    throw new Error(payload.message || "Failed to add address");
  }

  return payload;
}
