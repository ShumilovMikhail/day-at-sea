import { createFeatureSelector, createSelector } from '@ngrx/store';

import { costsAdapter, costsFeature } from './costs.reducer';
import { CostsState, CostsStateStatus } from '../types/costs-state.models';

// Lookup the 'Costs' feature state managed by NgRx
export const selectCostsState = createFeatureSelector<CostsState>(costsFeature.name);

export const costsEntitiesSelectors = costsAdapter.getSelectors();

export const selectCostsStatus = createSelector(selectCostsState, (state: CostsState) => state.status);

export const selectCostsError = createSelector(selectCostsState, (state: CostsState) => state.error);

export const selectCostsLoaded = createSelector(selectCostsState, (state: CostsState) => state.costsLoaded);

export const selectCostsLoading = createSelector(
  selectCostsStatus,
  (costsStatus: CostsStateStatus | null) => costsStatus === 'loading'
);

export const selectCosts = createSelector(selectCostsState, (state: CostsState) =>
  costsEntitiesSelectors.selectAll(state)
);
