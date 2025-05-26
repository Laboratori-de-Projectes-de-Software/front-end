import { AuthenticatedUserDTO } from "@interfaces/user.interface";
import { UserLoginDTO } from "@interfaces/user.interface";

export type AuthContextType = {
    user: AuthenticatedUserDTO | null;
    handleLogin: (userData: UserLoginDTO) => Promise<boolean>;
    logout: () => void;
    isUserLoggedIn: () => boolean;
    getUser: () => AuthenticatedUserDTO | null;
    loading: boolean;
}