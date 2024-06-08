import { createReducer, on, createFeature } from '@ngrx/store';

import { authActions } from './auth.actions';
import {
  AuthError,
  AuthResponse,
  AuthState,
  RegisterDataDTO,
} from './auth.models';
import { Token } from '../types';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialAuthState: AuthState = {
  authStatus: null,
  authToken: null,
  error: null,
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
      })
    ),
    on(
      authActions.registerFailure,
      (state, payload: { error: AuthError }): AuthState => ({
        ...state,
        authStatus: 'error',
        error: payload.error,
      })
    )
  ),
});
