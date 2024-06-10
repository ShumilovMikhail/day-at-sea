import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, tap } from 'rxjs';

import { authActions } from './auth.actions';
import { ApiService } from '@http';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';
import { AuthResponse } from '../types/auth.models';

export const registerEffect$ = createEffect(
  (actions$ = inject(Actions), api = inject(ApiService)) =>
    actions$.pipe(
      ofType(authActions.register),
      switchMap(({ data }) =>
        api.post<AuthResponse>('auth/signup', data).pipe(
          map((response: AuthResponse) =>
            authActions.registerSuccess(response)
          ),
          catchError(({ error }) => of(authActions.registerFailure({ error })))
        )
      )
    ),
  { functional: true }
);

export const loginEffect$ = createEffect(
  (actions$ = inject(Actions), api = inject(ApiService)) =>
    actions$.pipe(
      ofType(authActions.login),
      switchMap(({ data }) =>
        api.post<AuthResponse>('auth/login', data).pipe(
          map((response: AuthResponse) => authActions.loginSuccess(response)),
          catchError(({ error }) => of(authActions.loginFailure({ error })))
        )
      )
    ),
  { functional: true }
);

export const authAfterEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    localStorageJwtService = inject(LocalStorageJwtService)
  ) =>
    actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(({ authToken }) => {
        localStorageJwtService.setToken(authToken);
      })
    ),
  { functional: true, dispatch: false }
);

export const authInitEffect$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(authActions.init),
      map(() => {
        return authActions.loadTokenFromStorage();
      })
    ),
  { functional: true }
);

export const loadTokenFromStorageEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    localStorageJwtService = inject(LocalStorageJwtService)
  ) =>
    actions$.pipe(
      ofType(authActions.loadTokenFromStorage),
      map(() => {
        const authToken: null | string = localStorageJwtService.getToken();
        return authToken
          ? authActions.loadTokenFromStorageSuccess({ authToken })
          : authActions.loadTokenFromStorageFailure();
      })
    ),
  { functional: true }
);
