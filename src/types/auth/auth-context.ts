import { UserResponseDTO } from "@interfaces/user.interface";
import { UserDTOLogin } from "../../interfaces/shared/request.interfaces";

export type AuthContextType = {
    user: UserDTOLogin | null;
    handleLogin: (userData: UserDTOLogin) => void;
    logout: () => void;
    isUserLoggedIn: () => boolean;
    getUser: () => UserResponseDTO | null;
}