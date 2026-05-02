"use server";

import { JSON_HEADER, BASE_URL } from "@/lib/constants/api.constant";
import { ConfirmVerificationFields } from "@/lib/schemas/auth.schema";

export const confirmEmailVerificationAction = async (fields: ConfirmVerificationFields) => {
  const response = await fetch(`${BASE_URL}/auth/confirm-email-verification`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      ...JSON_HEADER,
    },
  });

  const payload = await response.json();

  if (payload.status === false || payload.error || payload.code >= 400) {
    let errorMessage = payload.message || payload.error || "Failed to confirm email.";

    if (payload.errors && payload.errors.length > 0) {
      errorMessage = payload.errors[0].message;
    }
    throw new Error(errorMessage);
  }

  return payload;
};
