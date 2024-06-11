import { inject } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { userActions } from './user.actions';
import { LocalStorageUserService } from '../services/local-storage-user.service';
import { UserEntity, UserDTO } from '../types/user.models';
import { ApiService } from '@http';
import { userDTOAdapter } from './user-dto.adapter';

export const userInitEffect$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(userActions.init),
      map(() => {
        return userActions.loadUserFromStorage();
      })
    ),
  { functional: true }
);

export const loadUserFromStorageEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    localStorageUserService = inject(LocalStorageUserService)
  ) =>
    actions$.pipe(
      ofType(userActions.loadUserFromStorage),
      map(() => {
        const user: UserEntity | null = localStorageUserService.getUser();
        return user
          ? userActions.loadUserFromStorageSuccess({ user })
          : userActions.loadUserFromStorageFailure();
      })
    ),
  { functional: true }
);

export const getUserEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(userActions.getUser),
      switchMap(() => {
        return apiService.get<UserDTO>('auth/me').pipe(
          map((userDTO: UserDTO) => {
            const user: UserEntity = userDTOAdapter.userDTOToEntity(userDTO);
            return userActions.getUserSuccess({ user });
          }),
          catchError(({ error }) => {
            return of(userActions.getUserFailure(error));
          })
        );
      })
    ),
  { functional: true }
);

export const getUserSuccessEffect$ = createEffect(
  (
    actions$ = inject(Actions),
    localStorageUserService = inject(LocalStorageUserService)
  ) =>
    actions$.pipe(
      ofType(userActions.getUserSuccess),
      tap(({ user }) => {
        localStorageUserService.setUser(user);
      })
    ),
  { functional: true, dispatch: false }
);
