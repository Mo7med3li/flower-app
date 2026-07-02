"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { ResetPasswordFields } from "@/lib/schemas/reset-password.schema";
import { APIResponse, SuccessfulResponse } from "@/lib/types/api";

export default async function resetPasswordAction(fields: ResetPasswordFields) {
  // Send POST request to reset password endpoint
  const response = await fetch(`${process.env.API}/auth/reset-password`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      ...JSON_HEADER,
    },
  });

  // Parse response as JSON
  const payload: APIResponse<SuccessfulResponse<ResetPasswordFields>> = await response.json();
  if (!payload.status) {
    throw new Error(payload.message || payload.error || "Failed to reset password");
  }

  // Return the response payload
  return payload;
}
