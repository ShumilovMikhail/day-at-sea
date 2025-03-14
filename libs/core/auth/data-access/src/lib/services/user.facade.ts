import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthStatus } from '../types/auth-state.models';
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthStatus,
  selectUser,
  selectUserEmail,
  selectUsername,
  selectUserPassword,
} from '../+state/auth.selectors';
import { ResponseError } from '@http';
import { UserEntity } from '../types/user.models';
import { authActions } from '../+state/auth.actions';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  private readonly store = inject(Store);

  public readonly status: Signal<AuthStatus | null> = toSignal(
    this.store.select(selectAuthStatus)
  ) as Signal<AuthStatus | null>;
  public readonly error: Signal<ResponseError | null> = toSignal(
    this.store.select(selectAuthError)
  ) as Signal<ResponseError | null>;
  public readonly loading: Signal<boolean> = toSignal(this.store.select(selectAuthLoading)) as Signal<boolean>;
  public readonly user: Signal<UserEntity | null> = toSignal(
    this.store.select(selectUser)
  ) as Signal<UserEntity | null>;
  public readonly username: Signal<string | null> = toSignal(this.store.select(selectUsername)) as Signal<
    string | null
  >;
  public readonly userEmail: Signal<string | null> = toSignal(this.store.select(selectUserEmail)) as Signal<
    string | null
  >;
  public readonly userPassword: Signal<string | null> = toSignal(this.store.select(selectUserPassword)) as Signal<
    string | null
  >;

  public changeUsername(username: string): void {
    const user = this.user();
    if (!user) throw Error('changeUsername: user is null');
    this.store.dispatch(authActions.changeUsername({ id: user.id, username }));
  }

  public changeUserEmail(email: string): void {
    const user = this.user();
    if (!user) throw Error('changeUserEmail: user is null');
    this.store.dispatch(authActions.changeUserEmail({ id: user.id, email }));
  }

  public changeUserPassword(password: string): void {
    const user = this.user();
    if (!user) throw Error('changeUserPassword: user is null');
    this.store.dispatch(authActions.changeUserPassword({ id: user.id, password }));
  }
}
