"use server";

import { JSON_HEADER, BASE_URL } from "@/lib/constants/api.constant";
import { SendVerificationFields } from "@/lib/schemes/auth.schema";

export const sendEmailVerificationAction = async (fields: SendVerificationFields) => {
  const response = await fetch(`${BASE_URL}/auth/send-email-verification`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      ...JSON_HEADER,
    },
  });

  const payload = await response.json();

  if (payload.status === false || payload.error || payload.code >= 400) {
    let errorMessage = payload.message || payload.error || "Failed to send verification email.";
    
    if (payload.errors && payload.errors.length > 0) {
        errorMessage = payload.errors[0].message;
    }
    throw new Error(errorMessage);
  }

  return payload;
};
