"use server";

import { revalidateTag } from "next/cache";
import { getAuthHeader } from "@/lib/utils/auth-header";
import { JSON_HEADER } from "@/lib/constants/api.constant";

export async function readAllNotifications() {
  const token = await getAuthHeader();
  const response = await fetch(`${process.env.API}/notifications/mark-all-read`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
  });

  const payload: APIResponse<MarkAllNotificationsReadResponse> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }
  revalidateTag("user-notifications");
  return payload;
}
