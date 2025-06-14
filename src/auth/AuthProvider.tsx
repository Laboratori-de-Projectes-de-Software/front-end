import { useContext, createContext, ReactNode, useState } from "react";
import { appApi } from "../features/shared/index.ts";
import type { AuthContextType } from "../types/auth/auth-context.ts";
import { UserLoginDTO } from "../interfaces/user.interface.ts";
import { AuthenticatedUserDTO } from "../interfaces/user.interface.ts";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [login] = appApi.usePostAuthLoginMutation();
  const [user, setUser] = useState<any>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setIsLoading] = useState(false);

  const handleLogin: Promise<boolean> = (userData: UserLoginDTO) => {
    setIsLoading(true);

    // TODO: No usar anidacion de Promesas, fix rapido
    return new Promise((resolve, reject) => {
      login(userData).unwrap().then((response: AuthenticatedUserDTO) => {
        localStorage.setItem("user", JSON.stringify(response));
        setUser(response);
        setIsLoading(false);
        resolve(true);
      }).catch(() => {
        setIsLoading(false);
        reject(false);
      });
    });
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isUserLoggedIn = () => {
    return user !== null
  }

  const getUser = () => {
    return user;
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, logout, isUserLoggedIn, getUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
