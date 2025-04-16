// auth-context.tsx
import React, { createContext,  useState, useContext } from "react";

type AuthContextProps = {
  isTokenExpired: boolean;
  setTokenExpiry: (expiryTime: string) => void; // ISO or local time string
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);

  const setTokenExpiry = (expiryTime: string) => {
    const expiry = new Date(expiryTime).getTime();
    const now = Date.now();
    const timeUntilExpiry = expiry - now;

    if (timeUntilExpiry <= 0) {
      setIsTokenExpired(true);
      return;
    }

    setIsTokenExpired(false);

    // Set a timeout to update the state once expired
    setTimeout(() => {
      setIsTokenExpired(true);
    }, timeUntilExpiry);
  };

  // return (
  //   <AuthContext.Provider>
  //     {children}
  //   </AuthContext.Provider>

  // );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};