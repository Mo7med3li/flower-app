"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";

type CheckUserStatusContextType = {
  isAuthenticated: boolean;
};

const CheckUserStatusContext = createContext<CheckUserStatusContextType | undefined>(undefined);

export const CheckUserStatusProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  // state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // effects
  useEffect(() => {
    setIsAuthenticated(!!session?.user?.id);
  }, [session]);

  return (
    <CheckUserStatusContext.Provider
      value={{
        isAuthenticated,
      }}
    >
      {children}
    </CheckUserStatusContext.Provider>
  );
};
export const useCheckUserStatus = () => {
  const context = useContext(CheckUserStatusContext);
  if (!context) {
    throw new Error("useCheckUserStatus must be used within an CheckUserStatusProvider");
  }
  return context;
};

export const useCheckUserStatusContext = useCheckUserStatus;
