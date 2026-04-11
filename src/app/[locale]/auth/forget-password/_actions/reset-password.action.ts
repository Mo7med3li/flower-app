"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { ResetPassword } from "@/lib/types/rest-password";

export default async function resetPasswordAction(fields: ResetPassword) {
  // Send PUT request to reset password endpoint
  const response = await fetch(`${process.env.API}/auth/reset-password`, {
    method: "PUT",
    body: JSON.stringify(fields),
    headers: {
      ...JSON_HEADER,
    },
  });

  // Parse response as JSON
  const payload: APIResponse<ResetPassword> = await response.json();
  if (!payload.status) {
    throw new Error(payload.message || payload.error || "Failed to reset password");
  }

  // Return the response payload
  return payload;
}
