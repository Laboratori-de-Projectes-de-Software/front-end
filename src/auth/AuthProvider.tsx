import { AuthContextType } from "@interfaces/auth/auth-context";
import { User } from "@interfaces/shared/user";
import axios from "axios";
import { useContext, createContext, ReactNode, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(localStorage.getItem("user"));

  const login = (userData: User) => {
    setUser(userData);
    axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/login`, userData).then((response) => {
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
