import { createFeatureSelector, createSelector } from '@ngrx/store';

import { authFeature } from './auth.reducer';
import { AuthState, AuthStatus } from '../types/auth-state.models';
import { UserEntity } from '../types/user.models';

// Lookup the 'Auth' feature state managed by NgRx
export const selectAuthState = createFeatureSelector<AuthState>(authFeature.name);

export const selectAuthStatus = createSelector(selectAuthState, (state: AuthState) => state.authStatus);

export const selectAuthToken = createSelector(selectAuthState, (state: AuthState) => state.authToken);

export const selectAuthError = createSelector(selectAuthState, (state: AuthState) => state.error);

export const selectIsAuthenticate = createSelector(selectAuthState, (state: AuthState) => state.isAuthenticate);

export const selectAuthLoading = createSelector(
  selectAuthStatus,
  (authStatus: AuthStatus | null) => authStatus === 'loading'
);

export const selectUser = createSelector(selectAuthState, (state: AuthState) => state.loggedUser);

export const selectUsername = createSelector(selectUser, (user: UserEntity | null) => user?.username ?? null);

export const selectUserEmail = createSelector(selectUser, (user: UserEntity | null) => user?.email ?? null);

export const selectUserPassword = createSelector(selectUser, (user: UserEntity | null) => user?.password ?? null);
