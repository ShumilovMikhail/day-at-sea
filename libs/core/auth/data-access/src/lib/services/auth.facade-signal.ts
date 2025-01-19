import { Injectable, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';

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
import { EmailLoginDataDTO, LoginData, UsernameLoginDataDTO } from '../types/login.models';
import { Token } from '../types/auth.models';
import { AuthStatus } from '../types/auth-state.models';
import { ResponseError } from '@http';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);

  public readonly status$: Signal<AuthStatus | null> = toSignal(
    this.store.select(selectAuthStatus)
  ) as Signal<AuthStatus | null>;
  public readonly token$: Signal<Token | null> = toSignal(this.store.select(selectAuthToken)) as Signal<Token | null>;
  public readonly error$: Signal<ResponseError | null> = toSignal(
    this.store.select(selectAuthError)
  ) as Signal<ResponseError | null>;
  public readonly loading$: Signal<boolean> = toSignal(this.store.select(selectAuthLoading)) as Signal<boolean>;
  public readonly isAuthenticate$: Signal<boolean> = toSignal(
    this.store.select(selectIsAuthenticate)
  ) as Signal<boolean>;

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
}
