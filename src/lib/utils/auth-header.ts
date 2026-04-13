"use server";
import { cookies } from "next/headers";
import { decode, JWT } from "next-auth/jwt";
import { AUTH_COOKIE, VERCEL_AUTH_COOKIE } from "../constants/auth.constant";

// Returns ready header
export async function getAuthHeader() {
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
    Authorization: `Bearer ${JWT?.token}`,
  };
}
