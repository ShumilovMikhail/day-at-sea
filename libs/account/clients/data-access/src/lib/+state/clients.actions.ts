import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { ResponseError } from '@http';
import { BookingHistoryItemEntity, ClientDTO, ClientEntity } from '../types/clients.models';

export const clientsActions = createActionGroup({
  source: 'Clients',
  events: {
    getClients: props<{ agencyId: number }>(),
    updateClient: props<{ agencyId: number; client: ClientDTO }>(),
    getClientBookingHistory: props<{ agencyId: number; clientId: number }>(),
    clearBookingHistory: emptyProps(),

    getClientsSuccess: props<{ clients: ClientEntity[] }>(),
    updateClientSuccess: props<{ client: ClientEntity }>(),
    getClientBookingHistorySuccess: props<{ bookings: BookingHistoryItemEntity[] }>(),

    getClientsFailure: props<{ error: ResponseError }>(),
    updateClientFailure: props<{ error: ResponseError }>(),
    getClientBookingHistoryFailure: props<{ error: ResponseError }>(),
  },
});
