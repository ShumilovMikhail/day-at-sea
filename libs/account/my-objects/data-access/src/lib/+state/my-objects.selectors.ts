import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MyObjectsState, MyObjectsStatus } from '../types/my-objects-state.models';
import { myObjectsAdapter, myObjectsFeature } from './my-objects.reducer';

// Lookup the 'MyObjects' feature state managed by NgRx
export const selectMyObjectsState = createFeatureSelector<MyObjectsState>(myObjectsFeature.name);

export const myObjectsEntitiesSelectors = myObjectsAdapter.getSelectors();

export const selectMyObjectsStatus = createSelector(selectMyObjectsState, (state: MyObjectsState) => state.status);

export const selectMyObjectsError = createSelector(selectMyObjectsState, (state: MyObjectsState) => state.error);

export const selectMyObjectsLoaded = createSelector(
  selectMyObjectsState,
  (state: MyObjectsState) => state.myObjectsLoaded
);

export const selectMyObjectsLoading = createSelector(
  selectMyObjectsStatus,
  (myObjectsStatus: MyObjectsStatus | null) => myObjectsStatus === 'loading'
);

export const selectMyObjects = createSelector(selectMyObjectsState, (state: MyObjectsState) =>
  myObjectsEntitiesSelectors.selectAll(state)
);
