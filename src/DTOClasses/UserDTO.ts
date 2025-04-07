export interface UserDTORegister {
    email: string;
    password: string;
  }
  
  export interface UserDTOLogin {
    email: string;
    password: string;
  }
  
  export interface UserResponseDTO {
    userId: number;
    email: string;
    token: string;
  }