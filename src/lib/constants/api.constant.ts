export const JSON_HEADER = {
  "Content-Type": "application/json",
};
export const AUTH_COOKIE = "next-auth.session-token";
export const VERCEL_AUTH_COOKIE = "__Secure-next-auth.session-token";
export const BASE_URL = process.env.API || "https://rose-app.elevate-bootcamp.cloud/api";
export const USER_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  USER: "USER",
} as const;
