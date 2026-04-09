"use server";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { UserAddresses } from "@/lib/types/user-addresses";
import { getTokenHeader } from "@/lib/utils/token-header";

export async function deleteAddress(id: string) {
  const token = await getTokenHeader();

  const respone = await fetch(`${process.env.API}/addresses/${id}`, {
    method: "DELETE",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token} `,
    },
  });

  const payload: APIResponse<UserAddresses> = await respone.json();

  if (!payload.status) {
    throw new Error(payload.message);
  }

  return payload;
}
