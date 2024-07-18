import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable, take, tap, withLatestFrom } from 'rxjs';

import { MyObjectsStatus } from '../types/my-objects-state.models';
import {
  selectMyObjects,
  selectMyObjectsError,
  selectMyObjectsLoaded,
  selectMyObjectsLoading,
  selectMyObjectsStatus,
} from '../+state/my-objects.selectors';
import { ResponseError } from '@http';
import { MyObjectEntity, MyObjectsEntity } from '../types/my-object.models';
import { myObjectsActions } from '../+state/my-objects.actions';
import { AgencyFacade } from '@account/data-access-agency';
import { myObjectsDTOAdapter } from '../+state/my-objects-dto.adapter';

@Injectable()
export class MyObjectsFacade {
  private readonly store = inject(Store);
  private readonly agencyFacade = inject(AgencyFacade);

  status$: Observable<MyObjectsStatus | null> = this.store.select(selectMyObjectsStatus);
  myObjectsLoaded$: Observable<boolean> = this.store.select(selectMyObjectsLoaded);
  error$: Observable<ResponseError | null> = this.store.select(selectMyObjectsError);
  loading$: Observable<boolean> = this.store.select(selectMyObjectsLoading);
  myObjects$: Observable<MyObjectsEntity> = this.store.select(selectMyObjects).pipe(
    withLatestFrom(this.myObjectsLoaded$, this.agencyFacade.id$),
    tap(([myObjects, isLoaded, agencyId]: [MyObjectsEntity, boolean, number | null]) => {
      if (!isLoaded && agencyId) {
        this.store.dispatch(myObjectsActions.getMyObjects({ agencyId }));
      }
    }),
    filter(([myObjects, isLoaded, agencyId]: [MyObjectsEntity, boolean, number | null]) => isLoaded),
    map(([myObjects, isLoaded, agencyId]: [MyObjectsEntity, boolean, number | null]) => {
      return myObjects;
    })
  );

  public addObject(myObject: MyObjectEntity): void {
    this.store.dispatch(myObjectsActions.addMyObject({ myObject }));
  }

  public updateMyObject(myObject: MyObjectEntity): void {
    this.agencyFacade.id$
      .pipe(
        filter((id: number | null): id is number => Boolean(id)),
        take(1)
      )
      .subscribe((agencyId: number) => {
        const id = myObject.id;
        const myObjectDTO = myObjectsDTOAdapter.myObjectEntityToDTO(myObject);
        this.store.dispatch(myObjectsActions.updateMyObject({ agencyId, id, myObject: myObjectDTO }));
      });
  }
}
