"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { getAuthHeader } from "@/lib/utils/auth-header";

export async function updateProfileAction(values: UpdateProfileFields) {
  // token
  const token = await getAuthHeader();

  // request
  const response = await fetch(`${process.env.API}/auth/editProfile`, {
    method: "PUT",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify(values),
  });

  // response
  const payload = await response.json();
  if ("error" in payload) {
    throw new Error(payload.error);
  }
  return payload;
}
