"use server";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { AddDressFormType } from "@/lib/schemas/address-model/address-form.schema";
import { UserAddresses } from "@/lib/types/user-addresses";
import { getTokenHeader } from "@/lib/utils/tokenHeader";

export async function updateAddress({ values, id }: { values: AddDressFormType; id: string }) {
  const token = await getTokenHeader();

  const response = await fetch(`${process.env.API}/addresses/${id}`, {
    method: "PATCH",
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

  if (!response.status) {
    throw new Error(payload.message);
  }

  return payload;
}
