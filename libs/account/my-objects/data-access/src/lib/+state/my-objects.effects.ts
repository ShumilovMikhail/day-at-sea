import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ApiService, ResponseError } from '@http';
import { myObjectsActions } from './my-objects.actions';
import { MyObjectDTO, MyObjectEntity, MyObjectsDTO, MyObjectsEntity } from '../types/my-object.models';
import { myObjectsDTOAdapter } from './my-objects-dto.adapter';

export const getMyObjectsEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(myObjectsActions.getMyObjects),
      switchMap(({ agencyId }: { agencyId: number }) => {
        return apiService.get<MyObjectsDTO>(`agencies/${agencyId}/my-objects`).pipe(
          map((myObjectsDTO: MyObjectsDTO) => {
            const myObjects: MyObjectsEntity = myObjectsDTO.map((myObjectDTO) =>
              myObjectsDTOAdapter.DTOToEntity(myObjectDTO)
            );
            return myObjectsActions.getMyObjectsSuccess({ myObjects });
          }),
          catchError((error: ResponseError) => of(myObjectsActions.getMyObjectsFailure({ error })))
        );
      })
    ),
  { functional: true }
);

export const updateMyObjectsEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(myObjectsActions.updateMyObject),
      switchMap(({ agencyId, id, myObject }: { agencyId: number; id: number; myObject: Omit<MyObjectDTO, 'id'> }) => {
        return apiService.put<MyObjectDTO>(`agencies/${agencyId}/my-objects/${id}`, myObject).pipe(
          map((myObjectDTO: MyObjectDTO) => {
            const myObject: MyObjectEntity = myObjectsDTOAdapter.DTOToEntity(myObjectDTO);
            return myObjectsActions.updateMyObjectSuccess({ myObject });
          }),
          catchError((error: ResponseError) => of(myObjectsActions.updateMyObjectFailure({ error })))
        );
      })
    ),
  { functional: true }
);
