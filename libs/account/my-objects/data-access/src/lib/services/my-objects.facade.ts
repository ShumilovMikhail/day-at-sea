import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatestWith, filter, map, Observable, take, tap } from 'rxjs';

import { MyObjectsStatus } from '../types/my-objects-state.models';
import {
  selectMyObjects,
  selectMyObjectsError,
  selectMyObjectsLoaded,
  selectMyObjectsLoading,
  selectMyObjectsStatus,
} from '../+state/my-objects.selectors';
import { ResponseError } from '@http';
import { MyObjectEntity, MyObjectsEntity, MyObjectsVM, MyObjectVM } from '../types/my-object.models';
import { myObjectsActions } from '../+state/my-objects.actions';
import { AgencyFacade } from '@account/data-access-agency';
import { myObjectsDTOAdapter } from '../+state/my-objects-dto.adapter';
import { SalesChannelVM } from '../types/sales-channel-vm.models';

@Injectable({ providedIn: 'root' })
export class MyObjectsFacade {
  private readonly store = inject(Store);
  private readonly agencyFacade = inject(AgencyFacade);

  public readonly status$: Observable<MyObjectsStatus | null> = this.store.select(selectMyObjectsStatus);
  public readonly myObjectsLoaded$: Observable<boolean> = this.store.select(selectMyObjectsLoaded);
  public readonly error$: Observable<ResponseError | null> = this.store.select(selectMyObjectsError);
  public readonly loading$: Observable<boolean> = this.store.select(selectMyObjectsLoading);
  public readonly myObjectsEntity$: Observable<MyObjectsEntity> = this.store.select(selectMyObjects).pipe(
    combineLatestWith(this.myObjectsLoaded$, this.agencyFacade.id$),
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

  public readonly myObjectsVM$: Observable<MyObjectsVM> = this.myObjectsEntity$.pipe(
    combineLatestWith(this.agencyFacade.salesChannels$),
    filter((args: [MyObjectsEntity, SalesChannelVM[] | null]): args is [MyObjectsEntity, SalesChannelVM[]] =>
      Boolean(args[0] && args[1])
    ),
    map(([myObjects, salesChannels]: [MyObjectsEntity, SalesChannelVM[]]) => {
      return myObjects.map((myObject: MyObjectEntity): MyObjectVM => {
        const salesChannel: SalesChannelVM | undefined = salesChannels.find(
          (salesChannel: SalesChannelVM) => salesChannel.id === myObject.salesChannelId
        );
        return {
          id: myObject.id,
          img: myObject.img,
          title: myObject.title,
          address: myObject.address,
          placementType: myObject.placementType,
          bookingMethod: myObject.bookingMethod,
          status: myObject.status,
          salesChannel: salesChannel ? salesChannel.title : 'нет',
          guestCount: myObject.guestCount,
          prices: myObject.prices,
        };
      });
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
        const myObjectDTO = myObjectsDTOAdapter.entityToDTO(myObject);
        this.store.dispatch(myObjectsActions.updateMyObject({ agencyId, id, myObject: myObjectDTO }));
      });
  }
}
