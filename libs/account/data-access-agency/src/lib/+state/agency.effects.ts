import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';

import { agencyActions } from './agency.actions';
import { ApiService } from '@http';
import { AgencyDTO, AgencyEntity } from '../types/agency.models';
import { agencyDTOAdapter } from './agency-dto.adapter';

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
