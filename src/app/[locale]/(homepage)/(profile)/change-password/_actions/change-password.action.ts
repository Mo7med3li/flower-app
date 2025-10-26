"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { ChangePasswordFormType } from "@/lib/schema/change-password/change-password.schema";
import { getAuthHeader } from "@/lib/utils/auth-header";

const changePasswordAction = async (values: ChangePasswordFormType) => {
  const token = await getAuthHeader();
  const response = await fetch("https://flower.elevateegy.com/api/v1/auth/change-password", {
    method: "PATCH",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify(values),
  });
  const payload = await response.json();
  if ("error" in payload) {
    throw new Error(payload.error);
  }
  return payload;
};
export default changePasswordAction;
