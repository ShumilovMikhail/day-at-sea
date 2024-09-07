import { inject } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ApiService, ResponseError } from '@http';
import { costsActions } from './costs.actions';
import { costDTOAdapter } from './cost-dto.adapter';
import { CostDTO, CostEntity, CostsDTO, CostsEntity } from '../types/costs.models';
import { NotificationsService } from '@notifications/data-access';
import { Router } from '@angular/router';

export const getCostsEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(costsActions.getCosts),
      switchMap(({ agencyId }: { agencyId: number }) => {
        return apiService.get<CostsDTO | CostDTO>(`agencies/${agencyId}/costs`).pipe(
          map((costsDTO: CostsDTO | CostDTO) => {
            let costs: CostsEntity = [];
            if (Array.isArray(costsDTO)) {
              costs = costsDTO.map((costDTO) => costDTOAdapter.DTOToEntity(costDTO) as CostEntity);
            } else {
              costs = [costDTOAdapter.DTOToEntity(costsDTO) as CostEntity];
            }
            return costsActions.getCostsSuccess({ costs });
          }),
          catchError((error: ResponseError) => of(costsActions.getCostsFailure({ error })))
        );
      })
    ),
  { functional: true }
);

export const addCostEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(costsActions.addCost),
      switchMap(({ agencyId, cost }: { agencyId: number; cost: Omit<CostDTO, 'id'> }) => {
        return apiService.post<CostDTO>(`agencies/${agencyId}/costs`, cost).pipe(
          map((costDTO: CostDTO) => {
            const cost: CostEntity = costDTOAdapter.DTOToEntity(costDTO) as CostEntity;
            return costsActions.addCostSuccess({ cost });
          }),
          catchError((error: ResponseError) => of(costsActions.addCostFailure({ error })))
        );
      })
    ),
  { functional: true }
);

export const addCostAfterEffect$ = createEffect(
  (actions$ = inject(Actions), notificationsService = inject(NotificationsService), router = inject(Router)) =>
    actions$.pipe(
      ofType(costsActions.addCostSuccess),
      tap(() => {
        router.navigateByUrl('account/costs');
        notificationsService.send({ message: 'Расход добавлен', type: 'success' });
      })
    ),
  { functional: true, dispatch: false }
);

export const updateCostEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(costsActions.updateCost),
      switchMap(({ agencyId, cost }: { agencyId: number; cost: CostDTO }) => {
        return apiService.put<CostDTO>(`agencies/${agencyId}/costs/${cost.id}`, cost).pipe(
          map((costDTO: CostDTO) => {
            const cost: CostEntity = costDTOAdapter.DTOToEntity(costDTO) as CostEntity;
            return costsActions.updateCostSuccess({ cost });
          }),
          catchError((error: ResponseError) => of(costsActions.updateCostFailure({ error })))
        );
      })
    ),
  { functional: true }
);

export const updateCostSuccessAfterEffect$ = createEffect(
  (actions$ = inject(Actions), notificationsService = inject(NotificationsService), router = inject(Router)) =>
    actions$.pipe(
      ofType(costsActions.updateCostSuccess),
      tap(() => {
        router.navigateByUrl('account/costs');
        notificationsService.send({ message: 'Расход обновлен', type: 'success' });
      })
    ),
  { functional: true, dispatch: false }
);

export const updateCostFailureAfterEffect$ = createEffect(
  (actions$ = inject(Actions), notificationsService = inject(NotificationsService)) =>
    actions$.pipe(
      ofType(costsActions.updateCostFailure),
      tap(() => {
        notificationsService.send({ message: 'Расход не обновлен', type: 'error' });
      })
    ),
  { functional: true, dispatch: false }
);

export const deleteCostEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(costsActions.deleteCost),
      switchMap(({ agencyId, id }: { agencyId: number; id: number }) => {
        return apiService.delete<null>(`agencies/${agencyId}/costs/${id}`).pipe(
          map(() => {
            return costsActions.deleteCostSuccess({ id });
          }),
          catchError((error: ResponseError) => of(costsActions.deleteCostFailure({ error })))
        );
      })
    ),
  { functional: true }
);

export const deleteCostAfterEffect$ = createEffect(
  (actions$ = inject(Actions), notificationsService = inject(NotificationsService)) =>
    actions$.pipe(
      ofType(costsActions.deleteCostSuccess),
      tap(() => {
        notificationsService.send({ message: 'Расход удален', type: 'success' });
      })
    ),
  { functional: true, dispatch: false }
);
