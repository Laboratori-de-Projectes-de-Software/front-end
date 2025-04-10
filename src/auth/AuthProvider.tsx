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
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogin = (userData: UserDTOLogin) => {
    login(userData).unwrap().then((response: UserResponseDTO) => {
      // TODO: Almacenar solo el token no todo el usuario. 
      // TODO: Hay que esperar a que se haga el endpoint que 
      // TODO: devuelva la informacion del usuario a partir del token

      localStorage.setItem("user", JSON.stringify(response));
      setUser(response);
    }).catch((error) => {
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
    <AuthContext.Provider value={{ user, handleLogin, logout, isUserLoggedIn, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
