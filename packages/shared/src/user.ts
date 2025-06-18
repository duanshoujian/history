interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface LoginRequest {
    username: string;
    password: string;
  }
  
  interface RegisterRequest {
    username: string;
    password: string;
    email: string;
  }
  
  interface LoginResponse {
    token: string;
    user: Omit<User, 'password'>;
  }
  
  interface RegisterResponse {
    user: Omit<User, 'password'>;
  } 

  export type { User, LoginRequest, RegisterRequest, LoginResponse, RegisterResponse };