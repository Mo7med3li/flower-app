"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { getAuthHeader } from "@/lib/utils/auth-header";

const deleteAccount = async () => {
  // token
  const token = await getAuthHeader();
  // delete account
  const response = await fetch(`${process.env.API}/users/account`, {
    method: "DELETE",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
  });
  const payload = await response.json();
  if (!payload.status) {
    throw new Error(payload.message);
  }
  return payload;
};

export default deleteAccount;
