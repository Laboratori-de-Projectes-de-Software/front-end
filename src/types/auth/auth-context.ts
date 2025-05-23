import { UserResponseDTO } from "@interfaces/user.interface";
import { UserDTOLogin } from "@interfaces/user.interface";

export type AuthContextType = {
    user: UserResponseDTO | null;
    handleLogin: (userData: UserDTOLogin) => Promise<boolean>;
    logout: () => void;
    isUserLoggedIn: () => boolean;
    getUser: () => UserResponseDTO | null;
    loading: boolean;
}