import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class UserFacade {
  private readonly store = inject(Store);

  public readonly status$: Observable<AuthStatus | null> = this.store.select(selectAuthStatus);
  public readonly error$: Observable<ResponseError | null> = this.store.select(selectAuthError);
  public readonly loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  public readonly user$: Observable<UserEntity | null> = this.store.select(selectUser);
  public readonly username$: Observable<string | null> = this.store.select(selectUsername);
  public readonly userEmail$: Observable<string | null> = this.store.select(selectUserEmail);
  public readonly userPassword$: Observable<string | null> = this.store.select(selectUserPassword);

  public changeUsername(username: string): void {
    this.user$.pipe(take(1)).subscribe((user: UserEntity | null) => {
      if (!user) {
        throw Error('changeUsername: user is null');
      }
      this.store.dispatch(authActions.changeUsername({ id: user.id, username }));
    });
  }

  public changeUserEmail(email: string): void {
    this.user$.pipe(take(1)).subscribe((user: UserEntity | null) => {
      if (!user) {
        throw Error('changeUserEmail: user is null');
      }
      this.store.dispatch(authActions.changeUserEmail({ id: user.id, email }));
    });
  }

  public changeUserPassword(password: string): void {
    this.user$.pipe(take(1)).subscribe((user: UserEntity | null) => {
      if (!user) {
        throw Error('changeUserPassword: user is null');
      }
      this.store.dispatch(authActions.changeUserPassword({ id: user.id, password }));
    });
  }
}
