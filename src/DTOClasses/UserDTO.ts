export interface UserRegisterDTO {
  user: string
  mail: string;
  password: string;
}

export interface UserLoginDTO {
  user: string;
  password: string;
}

export interface UserDTO {
  userId: number;
  user: string;
  mail: string;
}