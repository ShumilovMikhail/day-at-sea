import { Token } from './auth.models';
import { ResponseError } from '@http';
import { UserEntity } from './user.models';

export type AuthStatus = 'init' | 'loading' | 'loaded' | 'error';

export interface AuthState {
  authStatus: AuthStatus | null;
  error: ResponseError | null;
  loggedUser: UserEntity | null;
  authToken: Token | null;
  isAuthenticate: boolean;
}
