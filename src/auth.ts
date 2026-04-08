import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER, BASE_URL } from "./lib/constants/api.constant";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },

  // Authentication providers
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        // Input fields expected from the login form
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Validate credentials before API request to avoid unnecessary network calls
        if (!credentials?.username) {
          throw new Error("username is not allowed to be empty");
        }
        if (!credentials?.password) {
          throw new Error("password is not allowed to be empty");
        }

        const response = await fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
          headers: {
            ...JSON_HEADER,
          },
        });

        const data = await response.json();

        // Success condition: check if user exists inside data.payload
        if (data?.payload?.user) {
          const userObj = data.payload.user;
          return {
            id: userObj.id || userObj._id,
            user: userObj,
            token: data.payload.token,
          };
        }

        // Handle error responses dynamically
        let errorMessage = "Invalid credentials";

        if (data?.error) {
          errorMessage = typeof data.error === "string" ? data.error : JSON.stringify(data.error);
        } else if (data?.message) {
          if (data?.errors && data.errors.length > 0) {
            errorMessage = data.errors[0].message;
          } else {
            errorMessage = data.message;
          }
        } else if (data) {
          errorMessage = JSON.stringify(data); // generic fallback to see what the payload actually is
        }

        throw new Error(errorMessage);
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        // Add user and token to JWT payload after successful login
        token.token = user.token;
        token.user = user.user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // Adding user data to session
      session.user = token.user;
      return session;
    },
  },
};
