export interface AuthenticatedUserDTO {
  token: string;
  expiresIn: string;
  user: string;
  id: number;
}

export interface UserRegisterDTO {
  user: string;
  mail: string;
  password: string;
}

export interface UserLoginDTO {
  user: string;
  password: string;
}

export interface UserDTO {
  id: number;
  user: string;
  mail: string;
} 
