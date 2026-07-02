"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { ForgetPasswordFields } from "@/lib/schemas/forget-password.schema";
import { APIResponse, SuccessfulResponse } from "@/lib/types/api";
import { ForgetPassword } from "@/lib/types/forget-password";

export default async function forgetPasswordAction(fields: ForgetPasswordFields) {
  // Send POST request to forgot password endpoint
  const response = await fetch(`${process.env.API}/auth/forgot-password`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      ...JSON_HEADER,
    },
  });

  // Parse response as JSON
  const payload: APIResponse<SuccessfulResponse<ForgetPassword>> = await response.json();
  if (!payload.status) {
    throw new Error(payload.message || payload.error || "Failed to forget password");
  }

  // Return the response payload
  return payload;
}
