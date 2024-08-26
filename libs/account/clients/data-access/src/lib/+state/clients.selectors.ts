import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ClientsState, ClientsStateStatus } from '../types/clients-state.models';
import { clientsAdapter, clientsFeature } from './clients.reducer';

// Lookup the 'Clients' feature state managed by NgRx
export const selectClientsState = createFeatureSelector<ClientsState>(clientsFeature.name);

export const clientsEntitiesSelectors = clientsAdapter.getSelectors();

export const selectClientsStatus = createSelector(selectClientsState, (state: ClientsState) => state.status);

export const selectClientsLoaded = createSelector(selectClientsState, (state: ClientsState) => state.isLoaded);

export const selectClientsError = createSelector(selectClientsState, (state: ClientsState) => state.error);

export const selectClientsLoading = createSelector(
  selectClientsStatus,
  (clientsStatus: ClientsStateStatus) => clientsStatus === 'loading'
);

export const selectClients = createSelector(selectClientsState, (state: ClientsState) =>
  clientsEntitiesSelectors.selectAll(state)
);

export const selectBookingHistory = createSelector(selectClientsState, (state: ClientsState) => state.bookingHistory);
