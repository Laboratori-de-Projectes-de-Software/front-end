import { DateTime } from "luxon";
export interface UserResponseDTO {
  token: string;
  expiresIn: DateTime; // FIXME: No estoy muy a favor ni seguro de esto
  user: string;
  userId: number;
}

export interface UserDTORegister {
  user: string;
  mail: string;
  password: string;
}

export interface UserDTOLogin {
  mail: string;
  password: string;
}
