import { Token } from '../types';

export type AuthStatus = 'init' | 'loading' | 'loaded' | 'error';

export interface AuthState {
  authStatus: AuthStatus | null;
  error: AuthError | null;
  authToken: Token | null;
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

export interface AuthResponse {
  authToken: Token;
}

export interface AuthError {
  code: string;
  message: string;
  traceId: string;
  payload: unknown;
}
