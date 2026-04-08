import { User } from "next-auth";

export type LoginResponse = Pick<User, "token" | "user">;

export type RegisterResponse = ErrorResponse & {
  status: boolean;
  code: number;
  payload: {
    user: User;
    token: string;
  };
};
