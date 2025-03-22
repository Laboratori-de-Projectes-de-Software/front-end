import { User } from "@interfaces/shared/user";

export interface AuthContextType {
    user: User;
    login: (userData: any) => void;
    logout: () => void;
}