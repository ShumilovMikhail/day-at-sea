import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, tap, mergeMap } from 'rxjs';

import { agencyActions } from './agency.actions';
import { ApiService } from '@http';
import {
  AgencyDTO,
  AgencyEntity,
  AgencyRequisitesDTO,
  AgencyRequisitesEntity,
  Contacts,
  AgencyRulesDTO,
  AgencyRulesEntity,
  SalesChannelDTO,
  SalesChannelEntity,
  UpdateRequisitesRequestDTO,
} from '../types/agency.models';
import { agencyDTOAdapter } from './agency-dto.adapter';
import { SalesChannelRequestDTO } from '../types/agency-state.models';

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
        return apiService.get<AgencyDTO>(`users/${userId}/agency`).pipe(
          map((agencyDTO: AgencyDTO) => {
            const agency: AgencyEntity = agencyDTOAdapter.agencyDTOToEntity(agencyDTO);
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
        return apiService.put<{ contacts: Contacts }>(`agencies/${id}/contacts`, contacts).pipe(
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

export const updateAgencyRulesEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(agencyActions.updateAgencyRules),
      switchMap(({ id, rules }: { id: number; rules: AgencyRulesDTO }) => {
        return apiService.put<AgencyRulesDTO>(`agencies/${id}/rules`, rules).pipe(
          map((rules: AgencyRulesDTO) => {
            const rulesEntity = agencyDTOAdapter.rulesDTOToEntity(rules);
            return agencyActions.updateAgencyRulesSuccess({ rules: rulesEntity });
          }),
          catchError(({ error }) => {
            return of(agencyActions.updateAgencyRulesFailure({ error }));
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

export const updateAgencyRequisitesEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(agencyActions.updateAgencyRequisites),
      switchMap(({ id, requisites }: { id: number; requisites: UpdateRequisitesRequestDTO }) => {
        return apiService.put<AgencyRequisitesDTO>(`agencies/${id}/requisites`, requisites).pipe(
          map((requisites: AgencyRequisitesDTO) => {
            const requisitesEntity: AgencyRequisitesEntity = agencyDTOAdapter.requisitesDTOToEntity(requisites);
            return agencyActions.updateAgencyRequisitesSuccess({ requisites: requisitesEntity });
          }),
          catchError(({ error }) => {
            return of(agencyActions.updateAgencyRequisitesFailure({ error }));
          })
        );
      })
    ),
  { functional: true }
);

export const updateAgencyRequisitesSuccessEffect$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(agencyActions.updateAgencyRequisitesSuccess),
      tap(() => {
        router.navigateByUrl('/account/settings');
      })
    ),
  { functional: true, dispatch: false }
);

export const addAgencySalesChannel$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(agencyActions.addAgencySalesChannel),
      switchMap(({ id, salesChannel }: { id: number; salesChannel: SalesChannelRequestDTO }) => {
        return apiService.post<SalesChannelDTO>(`agencies/${id}/sales-channels`, salesChannel).pipe(
          map((salesChannel: SalesChannelDTO) => {
            const salesChannelEntity: SalesChannelEntity = agencyDTOAdapter.salesChannelDTOToEntity(salesChannel);
            return agencyActions.addAgencySalesChannelSuccess({ salesChannel: salesChannelEntity });
          }),
          catchError(({ error }) => {
            return of(agencyActions.addAgencySalesChannelFailure({ error }));
          })
        );
      })
    ),
  { functional: true }
);

export const updateAgencySalesChannel$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(agencyActions.updateAgencySalesChannel),
      switchMap(({ id, salesChannel }: { id: number; salesChannel: SalesChannelDTO }) => {
        return apiService
          .put<SalesChannelDTO>(
            `agencies/${id}/sales-channels/${salesChannel.id}`,
            agencyDTOAdapter.salesChannelDTOToRequestDTO(salesChannel)
          )
          .pipe(
            map((salesChannel: SalesChannelDTO) => {
              const salesChannelEntity: SalesChannelEntity = agencyDTOAdapter.salesChannelDTOToEntity(salesChannel);
              return agencyActions.updateAgencySalesChannelSuccess({ salesChannel: salesChannelEntity });
            }),
            catchError(({ error }) => {
              return of(agencyActions.updateAgencySalesChannelFailure({ error }));
            })
          );
      })
    ),
  { functional: true }
);

export const deleteAgencySalesChannel$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(agencyActions.deleteAgencySalesChannel),
      mergeMap(({ id, salesChannelId }: { id: number; salesChannelId: number }) => {
        return apiService.delete<SalesChannelDTO[]>(`agencies/${id}/sales-channels/${salesChannelId}`).pipe(
          map((salesChannels: SalesChannelDTO[]) => {
            return agencyActions.deleteAgencySalesChannelSuccess({ id: salesChannelId });
          }),
          catchError(({ error }) => {
            return of(agencyActions.deleteAgencySalesChannelFailure({ error }));
          })
        );
      })
    ),
  { functional: true }
);
