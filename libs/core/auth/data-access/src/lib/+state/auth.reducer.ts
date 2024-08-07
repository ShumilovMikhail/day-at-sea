import { createReducer, on, createFeature } from '@ngrx/store';

import { authActions } from './auth.actions';
import { AuthState } from '../types/auth-state.models';
import { RegisterDataDTO } from '../types/register.models';
import { AuthResponse, Token } from '../types/auth.models';
import { EmailLoginDataDTO, UsernameLoginDataDTO } from '../types/login.models';
import { ResponseError } from '@http';
import { UserEntity } from '../types/user.models';

export const initialAuthState: AuthState = {
  authStatus: null,
  authToken: null,
  loggedUser: null,
  error: null,
  isAuthenticate: false,
};

export const authFeature = createFeature({
  name: 'Auth',
  reducer: createReducer(
    initialAuthState,
    on(
      authActions.init,
      (state): AuthState => ({
        ...initialAuthState,
        authStatus: 'init',
      })
    ),
    on(
      authActions.loadTokenFromStorage,
      (state): AuthState => ({
        ...state,
        authStatus: 'loading',
        error: null,
      })
    ),
    on(
      authActions.loadTokenFromStorageSuccess,
      (state, payload: { authToken: Token }): AuthState => ({
        ...state,
        authStatus: 'loaded',
        authToken: payload.authToken,
        isAuthenticate: true,
      })
    ),
    on(
      authActions.loadTokenFromStorageFailure,
      (state): AuthState => ({
        ...state,
        authStatus: 'init',
      })
    ),
    on(
      authActions.register,
      (state, payload: { data: RegisterDataDTO }): AuthState => ({
        ...state,
        authStatus: 'loading',
        error: null,
        authToken: null,
      })
    ),
    on(
      authActions.registerSuccess,
      (state, payload: AuthResponse): AuthState => ({
        ...state,
        authStatus: 'loaded',
        authToken: payload.authToken,
        isAuthenticate: true,
      })
    ),
    on(
      authActions.registerFailure,
      (state, payload: { error: ResponseError }): AuthState => ({
        ...state,
        authStatus: 'error',
        error: payload.error,
      })
    ),
    on(
      authActions.login,
      (state, payload: { data: UsernameLoginDataDTO | EmailLoginDataDTO }): AuthState => ({
        ...state,
        authStatus: 'loading',
        error: null,
        authToken: null,
      })
    ),
    on(
      authActions.loginSuccess,
      (state, payload: AuthResponse): AuthState => ({
        ...state,
        authStatus: 'loaded',
        authToken: payload.authToken,
      })
    ),
    on(
      authActions.loginFailure,
      (state, payload: { error: ResponseError }): AuthState => ({
        ...state,
        authStatus: 'error',
        error: payload.error,
      })
    ),
    on(
      authActions.getUser,
      (state): AuthState => ({
        ...state,
        authStatus: 'loading',
        error: null,
      })
    ),
    on(
      authActions.getUserSuccess,
      (state, payload: { user: UserEntity }): AuthState => ({
        ...state,
        authStatus: 'loaded',
        loggedUser: payload.user,
        isAuthenticate: true,
      })
    ),
    on(
      authActions.getUserFailure,
      (state, payload: { error: ResponseError }): AuthState => ({
        ...state,
        authStatus: 'error',
        error: payload.error,
        isAuthenticate: false,
      })
    ),
    on(
      authActions.changeUsername,
      (state, payload: { id: number; username: string }): AuthState => ({
        ...state,
        authStatus: 'loading',
        error: null,
      })
    ),
    on(
      authActions.changeUsernameSuccess,
      (state, payload: { user: UserEntity }): AuthState => ({
        ...state,
        authStatus: 'loaded',
        loggedUser: payload.user,
      })
    ),
    on(
      authActions.changeUsernameFailure,
      (state, payload: { error: ResponseError }): AuthState => ({
        ...state,
        authStatus: 'error',
        error: payload.error,
      })
    ),
    on(
      authActions.changeUserEmail,
      (state, payload: { id: number; email: string }): AuthState => ({
        ...state,
        authStatus: 'loading',
        error: null,
      })
    ),
    on(
      authActions.changeUserEmailSuccess,
      (state, payload: { user: UserEntity }): AuthState => ({
        ...state,
        authStatus: 'loaded',
        loggedUser: payload.user,
      })
    ),
    on(
      authActions.changeUserEmailFailure,
      (state, payload: { error: ResponseError }): AuthState => ({
        ...state,
        authStatus: 'error',
        error: payload.error,
      })
    ),
    on(
      authActions.changeUserPassword,
      (state, payload: { id: number; password: string }): AuthState => ({
        ...state,
        authStatus: 'loading',
        error: null,
      })
    ),
    on(
      authActions.changeUserPasswordSuccess,
      (state, payload: { user: UserEntity }): AuthState => ({
        ...state,
        authStatus: 'loaded',
        loggedUser: payload.user,
      })
    ),
    on(
      authActions.changeUserPasswordFailure,
      (state, payload: { error: ResponseError }): AuthState => ({
        ...state,
        authStatus: 'error',
        error: payload.error,
      })
    )
  ),
});
