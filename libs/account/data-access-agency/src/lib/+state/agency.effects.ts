import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, tap } from 'rxjs';

import { agencyActions } from './agency.actions';
import { ApiService } from '@http';
import { AgencyDTO, AgencyEntity, Contacts } from '../types/agency.models';
import { agencyDTOAdapter } from './agency-dto.adapter';
import { Router } from '@angular/router';

export const agencyInitEffect$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(agencyActions.init),
      map(({ userId }) => {
        return agencyActions.getAgency({ userId });
      })
    ),
  { functional: true }
);

export const getAgencyEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(agencyActions.getAgency),
      switchMap(({ userId }) => {
        return apiService.get<AgencyDTO>(`agencies/user/${userId}`).pipe(
          map((agencyDTO: AgencyDTO) => {
            const agency: AgencyEntity =
              agencyDTOAdapter.agencyDTOToEntity(agencyDTO);
            return agencyActions.getAgencySuccess({ agency });
          }),
          catchError(({ error }) => {
            return of(agencyActions.getAgencyFailure({ error }));
          })
        );
      })
    ),
  { functional: true }
);

export const updateAgencyContactsEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(agencyActions.updateAgencyContacts),
      switchMap(({ id, contacts }: { id: number; contacts: Contacts }) => {
        return apiService
          .put<{ contacts: Contacts }>(`agencies/${id}/contacts`, contacts)
          .pipe(
            map((contacts: { contacts: Contacts }) => {
              return agencyActions.updateAgencyContactsSuccess(contacts);
            }),
            catchError(({ error }) => {
              return of(agencyActions.updateAgencyContactsFailure({ error }));
            })
          );
      })
    ),
  { functional: true }
);
export const updateAgencyContactsSuccessEffect$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(agencyActions.updateAgencyContactsSuccess),
      tap(() => {
        router.navigateByUrl('/account/settings');
      })
    ),
  { functional: true, dispatch: false }
);
