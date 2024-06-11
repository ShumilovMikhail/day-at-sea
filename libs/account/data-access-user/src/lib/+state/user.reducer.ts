import { createFeature, on, createReducer } from '@ngrx/store';

import { UserState } from '../types/user-state.models';
import { userActions } from './user.actions';
import { UserEntity, UserError } from '../types/user.models';

export const initialUserState: UserState = {
  userStatus: null,
  loggedUser: null,
  error: null,
};

export const userFeature = createFeature({
  name: 'User',
  reducer: createReducer(
    initialUserState,
    on(
      userActions.init,
      (state): UserState => ({
        ...initialUserState,
        userStatus: 'init',
      })
    ),
    on(
      userActions.loadUserFromStorage,
      (state): UserState => ({
        ...state,
        userStatus: 'loading',
        error: null,
      })
    ),
    on(
      userActions.loadUserFromStorageSuccess,
      (state, payload: { user: UserEntity }): UserState => ({
        ...state,
        userStatus: 'loaded',
        loggedUser: payload.user,
      })
    ),
    on(
      userActions.loadUserFromStorageFailure,
      (state): UserState => ({
        ...state,
        userStatus: 'init',
      })
    ),
    on(
      userActions.getUser,
      (state): UserState => ({
        ...state,
        userStatus: 'loading',
        error: null,
      })
    ),
    on(
      userActions.getUserSuccess,
      (state, payload: { user: UserEntity }): UserState => ({
        ...state,
        userStatus: 'loaded',
        loggedUser: payload.user,
      })
    ),
    on(
      userActions.getUserFailure,
      (state, payload: { error: UserError }): UserState => ({
        ...state,
        error: payload.error,
        userStatus: 'error',
      })
    )
  ),
});
