import { AuthError, Token } from './auth.models';

export type AuthStatus = 'init' | 'loading' | 'loaded' | 'error';

export interface AuthState {
  authStatus: AuthStatus | null;
  error: AuthError | null;
  authToken: Token | null;
  isAuthenticate: boolean;
}
