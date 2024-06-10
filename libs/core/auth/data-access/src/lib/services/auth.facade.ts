import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { authActions } from '../+state/auth.actions';
import {
  selectAuthError,
  selectAuthStatus,
  selectAuthToken,
} from '../+state/auth.selectors';
import { authDTOAdapter } from '../+state/auth-dto.adapter';
import { RegisterData, RegisterDataDTO } from '../types/register.models';
import {
  EmailLoginDataDTO,
  LoginData,
  LoginDataDTO,
} from '../types/login.models';

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
