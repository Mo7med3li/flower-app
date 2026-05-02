"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { ChangePasswordFormType } from "@/lib/schemas/change-password/change-password.schema";
import { getAuthHeader } from "@/lib/utils/auth-header";

const changePasswordAction = async (values: ChangePasswordFormType) => {
  const token = await getAuthHeader();
  const response = await fetch(`${process.env.API}/users/change-password`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify(values),
  });
  const payload = await response.json();
  if (!payload.status) {
    throw new Error(payload.message);
  }
  return payload;
};
export default changePasswordAction;
