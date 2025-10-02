"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";

export async function subscribeAction(values: { email: string }) {
  const response = await fetch(`${process.env.API}/subscriptions/subscribe`, {
    method: "POST",
    headers: JSON_HEADER,
    body: JSON.stringify(values),
  });
  const payload: APIResponse<Subscription> = await response.json();
  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
