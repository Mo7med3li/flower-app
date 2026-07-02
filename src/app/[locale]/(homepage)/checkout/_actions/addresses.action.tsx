// "use server";

import { UserAddresses } from "@/lib/types/user-addresses";
import { APIResponse, SuccessfulResponse } from "@/lib/types/api";
import { getAuthHeader } from "@/lib/utils/auth-header";

export default async function getAddresses() {
  const token = await getAuthHeader();
  const response = await fetch(`${process.env.API}/addresses`, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

  const payload: APIResponse<UserAddresses> = await response.json();
  if (!payload.status) {
    throw new Error(payload.message || "Failed to fetch addresses");
  }

  return payload as SuccessfulResponse<UserAddresses>;
}
