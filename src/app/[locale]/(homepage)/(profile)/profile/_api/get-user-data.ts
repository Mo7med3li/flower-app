import { UserDataResponse } from "@/lib/types/user-data";

export async function getUserData() {
  const response = await fetch("/api/user-data");
  const payload: APIResponse<UserDataResponse> = await response.json();
  if ("error" in payload) {
    throw new Error(payload.error);
  }
  return payload as SuccessfulResponse<UserDataResponse>;
}
