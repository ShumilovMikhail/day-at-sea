import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { ResponseError } from '@http';
import { ClientsState } from '../types/clients-state.models';
import { clientsActions } from './clients.actions';
import { BookingHistoryItemEntity, ClientDTO, ClientEntity } from '../types/clients.models';

export const clientsAdapter: EntityAdapter<ClientEntity> = createEntityAdapter<ClientEntity>();

export const initialClientsState: ClientsState = clientsAdapter.getInitialState({
  status: 'init',
  error: null,
  isLoaded: false,
  bookingHistory: null,
});

export const clientsFeature = createFeature({
  name: 'Clients',
  reducer: createReducer(
    initialClientsState,
    on(
      clientsActions.getClients,
      (state: ClientsState, payload: { agencyId: number }): ClientsState => ({
        ...state,
        status: 'loading',
        error: null,
      })
    ),
    on(
      clientsActions.getClientsSuccess,
      (state: ClientsState, payload: { clients: ClientEntity[] }): ClientsState =>
        clientsAdapter.setAll(payload.clients, {
          ...state,
          status: 'loaded',
          isLoaded: true,
        })
    ),
    on(
      clientsActions.getClientsFailure,
      (state: ClientsState, payload: { error: ResponseError }): ClientsState => ({
        ...state,
        status: 'error',
        error: payload.error,
      })
    ),

    on(
      clientsActions.updateClient,
      (state: ClientsState, payload: { agencyId: number; client: ClientDTO }): ClientsState => ({
        ...state,
        status: 'loading',
      })
    ),
    on(
      clientsActions.updateClientSuccess,
      (state: ClientsState, payload: { client: ClientEntity }): ClientsState =>
        clientsAdapter.updateOne(
          { id: payload.client.id, changes: payload.client },
          {
            ...state,
            status: 'loaded',
          }
        )
    ),
    on(
      clientsActions.updateClientFailure,
      (state: ClientsState, payload: { error: ResponseError }): ClientsState => ({
        ...state,
        status: 'error',
        error: payload.error,
      })
    ),

    on(
      clientsActions.getClientBookingHistory,
      (state: ClientsState, payload: { agencyId: number; clientId: number }): ClientsState => ({
        ...state,
        status: 'loading',
      })
    ),
    on(
      clientsActions.getClientBookingHistorySuccess,
      (state: ClientsState, payload: { bookings: BookingHistoryItemEntity[] }): ClientsState => ({
        ...state,
        bookingHistory: payload.bookings,
      })
    ),
    on(
      clientsActions.getClientBookingHistoryFailure,
      (state: ClientsState, payload: { error: ResponseError }): ClientsState => ({
        ...state,
        status: 'error',
        error: payload.error,
      })
    ),

    on(
      clientsActions.clearBookingHistory,
      (state: ClientsState): ClientsState => ({
        ...state,
        bookingHistory: null,
      })
    )
  ),
});
