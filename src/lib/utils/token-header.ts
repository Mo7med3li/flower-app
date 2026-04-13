import "server-only";

import { decode, JWT } from "next-auth/jwt";
import { cookies } from "next/headers";
import { AUTH_COOKIE, VERCEL_AUTH_COOKIE } from "../constants/auth.constant";

export async function getTokenHeader() {
  const standardCookie = cookies().get(AUTH_COOKIE)?.value;
  const secureCookie = cookies().get(VERCEL_AUTH_COOKIE)?.value;

  const tokenCookie = secureCookie || standardCookie;

  let JWT: JWT | null = null;

  try {
    JWT = await decode({
      token: tokenCookie,
      secret: process.env.NEXTAUTH_SECRET!,
    });
  } catch (error) {
    void error;
  }
  return {
    token: JWT?.token || "",
  };
}
