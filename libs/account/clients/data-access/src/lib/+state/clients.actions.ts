import { createActionGroup, props } from '@ngrx/store';

import { ResponseError } from '@http';
import { BookingHistoryItemEntity, ClientDTO, ClientEntity } from '../types/clients.models';

export const clientsActions = createActionGroup({
  source: 'Clients',
  events: {
    getClients: props<{ agencyId: number }>(),
    updateClient: props<{ agencyId: number; client: ClientDTO }>(),
    addBooking: props<{ id: number; booking: BookingHistoryItemEntity }>(),

    getClientsSuccess: props<{ clients: ClientEntity[] }>(),
    updateClientSuccess: props<{ client: ClientEntity }>(),

    getClientsFailure: props<{ error: ResponseError }>(),
    updateClientFailure: props<{ error: ResponseError }>(),
  },
});
