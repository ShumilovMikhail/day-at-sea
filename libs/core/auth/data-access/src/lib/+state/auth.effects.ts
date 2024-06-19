import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';

import { authActions } from './auth.actions';
import { ApiService } from '@http';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';
import { AuthResponse } from '../types/auth.models';
import { UserEntity } from '../types/user.models';

export const registerEffect$ = createEffect(
  (actions$ = inject(Actions), api = inject(ApiService)) =>
    actions$.pipe(
      ofType(authActions.register),
      switchMap(({ data }) =>
        api.post<AuthResponse>('auth/signup', data).pipe(
          map((response: AuthResponse) => authActions.registerSuccess(response)),
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
  (actions$ = inject(Actions), localStorageJwtService = inject(LocalStorageJwtService)) =>
    actions$.pipe(
      ofType(authActions.registerSuccess, authActions.loginSuccess),
      map(({ authToken }) => {
        localStorageJwtService.setToken(authToken);
        return authActions.getUser();
      })
    ),
  { functional: true }
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
  (actions$ = inject(Actions), localStorageJwtService = inject(LocalStorageJwtService)) =>
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

export const loadTokenFromStorageSuccessEffect$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(authActions.loadTokenFromStorageSuccess),
      map(({ authToken }) => {
        return authActions.getUser();
      })
    ),
  { functional: true }
);

export const getUserEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(authActions.getUser),
      switchMap(() => {
        return apiService.get<UserEntity>('auth/me').pipe(
          map((user: UserEntity) => {
            return authActions.getUserSuccess({ user });
          }),
          catchError(({ error }) => {
            return of(authActions.getUserFailure({ error }));
          })
        );
      })
    ),
  { functional: true }
);

export const changeUserLoginEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(authActions.changeUsername),
      switchMap(({ id, username }: { id: number; username: string }) => {
        return apiService.put<UserEntity>(`users/${id}/username`, { username }).pipe(
          map((user: UserEntity) => {
            return authActions.changeUsernameSuccess({ user });
          }),
          catchError(({ error }) => {
            return of(authActions.changeUsernameFailure({ error }));
          })
        );
      })
    ),
  { functional: true }
);

export const changeUserEmailEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(authActions.changeUserEmail),
      switchMap(({ id, email }: { id: number; email: string }) => {
        return apiService.put<UserEntity>(`users/${id}/email`, { email }).pipe(
          map((user: UserEntity) => {
            return authActions.changeUserEmailSuccess({ user });
          }),
          catchError(({ error }) => {
            return of(authActions.changeUserEmailFailure({ error }));
          })
        );
      })
    ),
  { functional: true }
);
