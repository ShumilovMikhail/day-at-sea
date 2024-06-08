import { Token } from '../types';

export type AuthStatus = 'init' | 'loading' | 'loaded' | 'error';

export interface AuthState {
  authStatus: AuthStatus | null;
  error: AuthError | null;
  authToken: Token | null;
  isAuthenticate: boolean;
}
export interface RegisterDataDTO {
  login: string;
  email: string;
  full_name: string;
  password: string;
}
export interface RegisterData {
  login: string;
  email: string;
  fullName: string;
  password: string;
}
interface BaseLoginDataDTO {
  password: string;
}
export interface LoginDataDTO extends BaseLoginDataDTO {
  login: string;
}
export interface EmailLoginDataDTO extends BaseLoginDataDTO {
  email: string;
}

export interface LoginData {
  loginOrEmail: string;
  password: string;
}
export interface AuthResponse {
  authToken: Token;
}

export interface AuthError {
  code: string;
  message: string;
  traceId: string;
  payload: unknown;
}
