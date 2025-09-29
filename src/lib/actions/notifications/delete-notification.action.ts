"use server";

import { revalidateTag } from "next/cache";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { getAuthHeader } from "@/lib/utils/auth-header";

export async function deleteNotification(notification_id: string) {
  const token = await getAuthHeader();
  const response = await fetch(`${process.env.API}/notifications/${notification_id}`, {
    method: "DELETE",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
  });

  const payload = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }
  revalidateTag("user-notifications");
  return payload;
}
