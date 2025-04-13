import { useContext, createContext, ReactNode, useState } from "react";
import { appApi } from "../features/shared/index.ts";
import type { AuthContextType } from "../types/auth/auth-context.ts";
import { UserDTOLogin } from "../interfaces/user.interface.ts";
import { UserResponseDTO } from "../interfaces/user.interface.ts";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [login] = appApi.usePostAuthLoginMutation();
  const [user, setUser] = useState<UserResponseDTO | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser).body : null;
  });
  const [loading, setIsLoading] = useState(false);

  const handleLogin = (userData: UserDTOLogin) => {
    setIsLoading(true);
    login(userData).unwrap().then((response: UserResponseDTO) => {
      localStorage.setItem("user", JSON.stringify(response));
      setUser(response);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.error("Login error:", error);
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
