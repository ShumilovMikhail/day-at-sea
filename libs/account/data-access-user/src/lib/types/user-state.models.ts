import { UserEntity } from './user.models';
import { ResponseError } from '@http';

export type UserStatus = 'init' | 'loading' | 'loaded' | 'error';

export interface UserState {
  userStatus: UserStatus | null;
  loggedUser: UserEntity | null;
  error: ResponseError | null;
}
