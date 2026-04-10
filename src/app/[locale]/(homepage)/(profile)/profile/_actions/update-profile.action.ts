"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { getAuthHeader } from "@/lib/utils/auth-header";

export async function updateProfileAction(values: UpdateProfileFields) {
  // token
  const token = await getAuthHeader();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { email, gender, ...rest } = values;
  // request
  const response = await fetch(`${process.env.API}/users/profile`, {
    method: "PATCH",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify(rest),
  });

  // response
  const payload = await response.json();
  if (!payload.status) {
    throw new Error(payload.message);
  }

  return payload;
}
