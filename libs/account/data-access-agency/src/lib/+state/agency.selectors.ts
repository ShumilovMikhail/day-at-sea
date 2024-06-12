import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AgencyState, AgencyStatus } from '../types/agency-state.models';
import { agencyFeature } from './agency.reducer';

// Lookup the 'Agency' feature state managed by NgRx
export const selectAgencyState = createFeatureSelector<AgencyState>(
  agencyFeature.name
);

export const selectAgencyStatus = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.status
);

export const selectAgency = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.agency
);

export const selectAgencyError = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.error
);

export const selectAgencyLoading = createSelector(
  selectAgencyStatus,
  (status: AgencyStatus | null) => status === 'loading'
);
