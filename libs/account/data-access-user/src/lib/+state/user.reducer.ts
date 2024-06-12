import { createFeature, on, createReducer } from '@ngrx/store';

import { UserState } from '../types/user-state.models';
import { userActions } from './user.actions';
import { UserEntity } from '../types/user.models';
import { ResponseError } from '@http';

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
      (state, payload: { error: ResponseError }): UserState => ({
        ...state,
        error: payload.error,
        userStatus: 'error',
      })
    )
  ),
});
