"use server";

import { JSON_HEADER, BASE_URL } from "@/lib/constants/api.constant";
import { RegistrationFields } from "@/lib/schemes/auth.schema";
import { RegisterResponse } from "@/lib/types/auth";

export const registerAction = async (registrationFields: RegistrationFields) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(registrationFields),
    headers: {
      ...JSON_HEADER,
    },
  });

  const payload: RegisterResponse = await response.json();

  if (payload.status === false || payload.code >= 400) {
    let errorMessage = payload.message || "Failed to register.";

    if (payload.errors && payload.errors.length > 0) {
      errorMessage = payload.errors[0].message;
    }
    throw new Error(errorMessage);
  }

  return payload;
};
