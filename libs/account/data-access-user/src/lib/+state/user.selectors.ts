import { createFeatureSelector, createSelector } from '@ngrx/store';

import { userFeature } from './user.reducer';
import { UserState, UserStatus } from '../types/user-state.models';

// Lookup the 'User' feature state managed by NgRx
export const selectUserState = createFeatureSelector<UserState>(
  userFeature.name
);

export const selectUserStatus = createSelector(
  selectUserState,
  (state: UserState) => state.userStatus
);

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.loggedUser
);

export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

export const selectUserLoading = createSelector(
  selectUserStatus,
  (userStatus: UserStatus | null) => userStatus === 'loading'
);
