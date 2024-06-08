import { createFeatureSelector, createSelector } from '@ngrx/store';

import { authFeature } from './auth.reducer';
import { AuthState } from './auth.models';

// Lookup the 'Auth' feature state managed by NgRx
export const selectAuthState = createFeatureSelector<AuthState>(
  authFeature.name
);

export const selectAuthStatus = createSelector(
  selectAuthState,
  (state: AuthState) => state.authStatus
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.authToken
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectIsAuthenticate = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticate
);
