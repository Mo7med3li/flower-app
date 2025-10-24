"use server";

import { getAuthHeader } from "@/lib/utils/auth-header";

const updateUserPhoto = async (formData: FormData) => {
  // token
  const token = await getAuthHeader();
  const response = await fetch(`${process.env.API}/auth/upload-photo`, {
    method: "PUT",
    headers: {
      // ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
    body: formData,
  });
  const payload = await response.json();
  if (payload.error) {
    throw new Error(payload.error);
  }
  return payload;
};

export default updateUserPhoto;
