import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AgencyState, AgencyStatus } from '../types/agency-state.models';
import { agencyFeature } from './agency.reducer';
import { AgencyEntity } from '../types/agency.models';

// Lookup the 'Agency' feature state managed by NgRx
export const selectAgencyState = createFeatureSelector<AgencyState>(agencyFeature.name);

export const selectAgencyStatus = createSelector(selectAgencyState, (state: AgencyState) => state.status);

export const selectAgency = createSelector(selectAgencyState, (state: AgencyState) => state.agency);

export const selectAgencyError = createSelector(selectAgencyState, (state: AgencyState) => state.error);

export const selectAgencyLoading = createSelector(
  selectAgencyStatus,
  (status: AgencyStatus | null) => status === 'loading'
);

export const selectAgencyContacts = createSelector(selectAgency, (agency: AgencyEntity | null) =>
  agency ? agency.contacts : null
);

export const selectAgencyRequisites = createSelector(selectAgency, (agency: AgencyEntity | null) =>
  agency
    ? {
        name: agency?.name,
        city: agency?.city,
        contactPerson: agency?.contactPerson,
        phone: agency?.phone,
        logo: agency?.logo,
      }
    : null
);

export const selectAgencyId = createSelector(selectAgency, (agency: AgencyEntity | null) =>
  agency ? agency.id : null
);

export const selectAgencySalesChannels = createSelector(selectAgency, (agency: AgencyEntity | null) =>
  agency ? agency.salesChannels : null
);
