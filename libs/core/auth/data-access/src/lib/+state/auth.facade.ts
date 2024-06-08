import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { authActions } from './auth.actions';
import {
  selectAuthError,
  selectAuthStatus,
  selectAuthToken,
} from './auth.selectors';
import {
  EmailLoginDataDTO,
  LoginData,
  LoginDataDTO,
  RegisterData,
  RegisterDataDTO,
} from './auth.models';
import { authDTOAdapter } from './auth-dto.adapter';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);

  public readonly status$ = this.store.select(selectAuthStatus);
  public readonly token$ = this.store.select(selectAuthToken);
  public readonly error$ = this.store.select(selectAuthError);

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
