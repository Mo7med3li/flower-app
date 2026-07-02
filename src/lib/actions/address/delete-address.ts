"use server";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { APIResponse } from "@/lib/types/api";
import { UserAddresses } from "@/lib/types/user-addresses";
import { getTokenHeader } from "@/lib/utils/tokenHeader";

export async function deleteAddress(id: string) {
  const token = await getTokenHeader();

  const response = await fetch(`${process.env.API}/addresses/${id}`, {
    method: "DELETE",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token} `,
    },
  });

  const payload: APIResponse<UserAddresses> = await response.json();

  if (!payload.status) {
    throw new Error(payload.message);
  }

  return payload;
}
