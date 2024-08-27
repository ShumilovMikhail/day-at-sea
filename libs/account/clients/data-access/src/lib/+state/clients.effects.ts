import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ApiService, ResponseError } from '@http';
import { clientsActions } from './clients.actions';
import { ClientDTO, ClientEntity } from '../types/clients.models';
import { clientsDTOAdapter } from './clients-dto.adapter';

export const getClientsEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(clientsActions.getClients),
      switchMap(({ agencyId }: { agencyId: number }) => {
        return apiService.get<ClientDTO[] | ClientDTO>(`agencies/${agencyId}/clients`).pipe(
          map((clientsDTO: ClientDTO[] | ClientDTO) => {
            let clients: ClientEntity[] = [];
            if (Array.isArray(clientsDTO)) {
              clients = clientsDTO.map((client) => clientsDTOAdapter.dtoToEntity(client));
            } else {
              clients.push(clientsDTOAdapter.dtoToEntity(clientsDTO));
            }
            return clientsActions.getClientsSuccess({ clients });
          }),
          catchError((error: ResponseError) => {
            return of(clientsActions.getClientsFailure({ error }));
          })
        );
      })
    ),
  { functional: true }
);

export const updateClientEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(clientsActions.updateClient),
      switchMap(({ agencyId, client }: { agencyId: number; client: ClientDTO }) => {
        return apiService.put<ClientDTO>(`agencies/${agencyId}/clients/${client.id}`, client).pipe(
          map((clientDTO: ClientDTO) => {
            const client: ClientEntity = clientsDTOAdapter.dtoToEntity(clientDTO);
            return clientsActions.updateClientSuccess({ client });
          }),
          catchError((error: ResponseError) => of(clientsActions.updateClientFailure({ error })))
        );
      })
    ),
  { functional: true }
);
