import { UserEntity, UserError } from './user.models';

export type UserStatus = 'init' | 'loading' | 'loaded' | 'error';

export interface UserState {
  userStatus: UserStatus | null;
  loggedUser: UserEntity | null;
  error: UserError | null;
}
