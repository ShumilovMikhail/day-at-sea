import { Token } from './auth.models';
import { ResponseError } from '@http';

export type AuthStatus = 'init' | 'loading' | 'loaded' | 'error';

export interface AuthState {
  authStatus: AuthStatus | null;
  error: ResponseError | null;
  authToken: Token | null;
  isAuthenticate: boolean;
}
