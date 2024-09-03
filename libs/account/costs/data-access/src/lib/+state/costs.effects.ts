import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ApiService, ResponseError } from '@http';
import { costsActions } from './costs.actions';
import { costDTOAdapter } from './cost-dto.adapter';
import { CostDTO, CostEntity, CostsDTO, CostsEntity } from '../types/costs.models';

export const getCostsEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(costsActions.getCosts),
      switchMap(({ agencyId }: { agencyId: number }) => {
        return apiService.get<CostsDTO | CostDTO>(`agencies/${agencyId}/costs`).pipe(
          map((costsDTO: CostsDTO | CostDTO) => {
            let costs: CostsEntity = [];
            if (Array.isArray(costsDTO)) {
              costs = costsDTO.map((costDTO) => costDTOAdapter.DTOToEntity(costDTO));
            } else {
              costs = [costDTOAdapter.DTOToEntity(costsDTO)];
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
        return apiService.put<CostDTO>(`agencies/${agencyId}/costs`, cost).pipe(
          map((costDTO: CostDTO) => {
            const cost: CostEntity = costDTOAdapter.DTOToEntity(costDTO);
            return costsActions.addCostSuccess({ cost });
          }),
          catchError((error: ResponseError) => of(costsActions.addCostFailure({ error })))
        );
      })
    ),
  { functional: true }
);

export const updateCostEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(costsActions.updateCost),
      switchMap(({ agencyId, cost }: { agencyId: number; cost: CostDTO }) => {
        return apiService.put<CostDTO>(`agencies/${agencyId}/costs`, cost).pipe(
          map((costDTO: CostDTO) => {
            const cost: CostEntity = costDTOAdapter.DTOToEntity(costDTO);
            return costsActions.updateCostSuccess({ cost });
          }),
          catchError((error: ResponseError) => of(costsActions.updateCostFailure({ error })))
        );
      })
    ),
  { functional: true }
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
