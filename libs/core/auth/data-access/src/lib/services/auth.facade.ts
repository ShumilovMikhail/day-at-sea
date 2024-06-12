import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { authActions } from '../+state/auth.actions';
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthStatus,
  selectAuthToken,
  selectIsAuthenticate,
} from '../+state/auth.selectors';
import { authDTOAdapter } from '../+state/auth-dto.adapter';
import { RegisterData, RegisterDataDTO } from '../types/register.models';
import {
  EmailLoginDataDTO,
  LoginData,
  LoginDataDTO,
} from '../types/login.models';
import { Token } from '../types/auth.models';
import { AuthStatus } from '../types/auth-state.models';
import { ResponseError } from '@http';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);

  public readonly status$: Observable<AuthStatus | null> =
    this.store.select(selectAuthStatus);
  public readonly token$: Observable<Token | null> =
    this.store.select(selectAuthToken);
  public readonly error$: Observable<ResponseError | null> =
    this.store.select(selectAuthError);
  public readonly loading$: Observable<boolean> =
    this.store.select(selectAuthLoading);
  public readonly isAuthenticate$: Observable<boolean> =
    this.store.select(selectIsAuthenticate);

  public init(): void {
    this.store.dispatch(authActions.init());
  }

  public register(registerData: RegisterData): void {
    const data: RegisterDataDTO =
      authDTOAdapter.registerDataToDTO(registerData);
    this.store.dispatch(authActions.register({ data }));
  }

  public login(loginData: LoginData): void {
    const data: LoginDataDTO | EmailLoginDataDTO =
      authDTOAdapter.loginDataToDTO(loginData);
    this.store.dispatch(authActions.login({ data }));
  }
}
