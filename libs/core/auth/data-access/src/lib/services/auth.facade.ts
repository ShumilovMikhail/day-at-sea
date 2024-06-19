import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { authActions } from '../+state/auth.actions';
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthStatus,
  selectAuthToken,
  selectIsAuthenticate,
  selectUser,
  selectUserEmail,
  selectUserPassword,
  selectUsername,
} from '../+state/auth.selectors';
import { authDTOAdapter } from '../+state/auth-dto.adapter';
import { RegisterData, RegisterDataDTO } from '../types/register.models';
import { EmailLoginDataDTO, LoginData, UsernameLoginDataDTO } from '../types/login.models';
import { Token } from '../types/auth.models';
import { AuthStatus } from '../types/auth-state.models';
import { ResponseError } from '@http';
import { UserEntity } from '../types/user.models';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);

  public readonly status$: Observable<AuthStatus | null> = this.store.select(selectAuthStatus);
  public readonly token$: Observable<Token | null> = this.store.select(selectAuthToken);
  public readonly error$: Observable<ResponseError | null> = this.store.select(selectAuthError);
  public readonly loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  public readonly isAuthenticate$: Observable<boolean> = this.store.select(selectIsAuthenticate);
  public readonly user$: Observable<UserEntity | null> = this.store.select(selectUser);
  public readonly username$: Observable<string | null> = this.store.select(selectUsername);
  public readonly userEmail$: Observable<string | null> = this.store.select(selectUserEmail);
  public readonly userPassword$: Observable<string | null> = this.store.select(selectUserPassword);

  public init(): void {
    this.store.dispatch(authActions.init());
  }

  public register(registerData: RegisterData): void {
    const data: RegisterDataDTO = authDTOAdapter.registerDataToDTO(registerData);
    this.store.dispatch(authActions.register({ data }));
  }

  public login(loginData: LoginData): void {
    const data: UsernameLoginDataDTO | EmailLoginDataDTO = authDTOAdapter.loginDataToDTO(loginData);
    this.store.dispatch(authActions.login({ data }));
  }

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
        throw Error('changeUsername: user is null');
      }
      this.store.dispatch(authActions.changeUserEmail({ id: user.id, email }));
    });
  }

  public changeUserPassword(password: string): void {
    this.user$.pipe(take(1)).subscribe((user: UserEntity | null) => {
      if (!user) {
        throw Error('changeUsername: user is null');
      }
      this.store.dispatch(authActions.changeUserPassword({ id: user.id, password }));
    });
  }
}
