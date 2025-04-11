export interface UserDTORegister {
  user: string
  mail: string;
  password: string;
}

export interface UserDTOLogin {
  user: string;
  password: string;
}

export interface UserResponseDTO {
  token: string;
  expiresIn: string;
  user: string;
  userId: number;
}