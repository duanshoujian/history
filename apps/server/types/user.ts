export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: Omit<User, 'password'>;
}

export interface RegisterResponse {
  user: Omit<User, 'password'>;
} 