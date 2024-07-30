import { ComponentStore } from '@ngrx/component-store';
import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MyObjectsFilters, MyObjectsState, ObjectEdit } from '../../types/my-objects-state';
import { combineLatestWith, filter, map, Observable, take } from 'rxjs';

import {
  MyObjectEntity,
  MyObjectsEntity,
  MyObjectsFacade,
  MyObjectStatusEntity,
} from '@account/my-objects/data-access';
import { MyObjectsTableList, MyObjectsVM, MyObjectTableItem } from '../../types/my-objects-vm.models';
import { myObjectsEntityAdapter } from './my-objects-entity.adapter';
import { AgencyFacade, SalesChannelEntity } from '@account/data-access-agency';

export const initialState: MyObjectsState = {
  objects: null,
  filters: null,
};

export const filtersFunctions = {
  title: (myObjects: MyObjectsTableList, { title }: { title: string }) =>
    myObjects.filter((myObject: MyObjectTableItem) => myObject.title.toLowerCase().includes(title)),
  bookingMethod: (myObjects: MyObjectsTableList, { bookingMethod }: { bookingMethod: string }) =>
    bookingMethod !== ''
      ? myObjects.filter((myObject: MyObjectTableItem) => myObject.bookingMethod === bookingMethod)
      : myObjects,
  price: (myObjects: MyObjectsTableList, { price }: { price: string }) =>
    price !== '' ? myObjects.filter((myObject: MyObjectTableItem) => +myObject.price <= +price) : myObjects,
  salesChannel: (myObjects: MyObjectsTableList, { salesChannel }: { salesChannel: string }) =>
    salesChannel !== '' && salesChannel !== 'нет'
      ? myObjects.filter((myObject: MyObjectTableItem) => myObject.salesChannel === salesChannel)
      : myObjects,
  guestCount: (myObjects: MyObjectsTableList, { guestCount }: { guestCount: string }) =>
    guestCount !== ''
      ? myObjects.filter((myObject: MyObjectTableItem) => myObject.guestCount === guestCount)
      : myObjects,
};

export class MyObjectsStore extends ComponentStore<MyObjectsState> {
  private readonly agencyFacade = inject(AgencyFacade);
  private readonly myObjectsFacade = inject(MyObjectsFacade);

  public readonly myObjects$: Observable<MyObjectsTableList | null> = this.select(
    (state: MyObjectsState) => state.objects
  );
  public readonly filters$: Observable<MyObjectsFilters | null> = this.select((state: MyObjectsState) => state.filters);
  public readonly myObjectsWithFilters: Observable<MyObjectsTableList | null> = this.select(
    this.myObjects$,
    this.filters$,
    (myObjects, filters) => (myObjects ? this.applyFilters(myObjects, filters) : null)
  );
  public readonly salesChannels$: Observable<string[] | null> = this.agencyFacade.salesChannels$.pipe(
    map((salesChannels) => salesChannels?.map((salesChannel) => salesChannel.title) ?? null)
  );
  public readonly loading$: Observable<boolean> = this.myObjectsFacade.loading$;

  constructor() {
    super(initialState);
    this.myObjectsFacade.myObjectsVM$
      .pipe(
        map((myObjects: MyObjectsVM): MyObjectsTableList => myObjectsEntityAdapter.entityToVM(myObjects)),
        takeUntilDestroyed()
      )
      .subscribe((myObjects: MyObjectsTableList) => {
        this.setMyObjects(myObjects);
      });
  }

  public setFilters = this.updater((state: MyObjectsState, filters: MyObjectsFilters) => ({
    ...state,
    filters: filters,
  }));

  public editObject(id: number, object: ObjectEdit): void {
    this.myObjectsFacade.myObjectsEntity$
      .pipe(
        combineLatestWith(this.agencyFacade.salesChannels$),
        map(
          ([myObjects, salesChannels]: [MyObjectsEntity | null, SalesChannelEntity[] | null]): [
            MyObjectEntity | undefined,
            SalesChannelEntity[] | null
          ] => {
            const object = myObjects?.find((myObject) => myObject.id === id) ?? undefined;
            return [object, salesChannels];
          }
        ),
        filter(
          (
            args: [MyObjectEntity | undefined, SalesChannelEntity[] | null]
          ): args is [MyObjectEntity, SalesChannelEntity[]] => Boolean(args[0] && args[1])
        ),
        take(1)
      )
      .subscribe(([myObject, salesChannels]: [MyObjectEntity, SalesChannelEntity[]]) => {
        this.myObjectsFacade.updateMyObject({
          ...myObject,
          salesChannelId: salesChannels.find((salesChannel) => salesChannel.title === object.salesChannel)?.id ?? null,
          status: object.status as MyObjectStatusEntity,
          bookingMethod: object.bookingMethod as string,
        });
      });
  }

  private setMyObjects = this.updater((state: MyObjectsState, myObjects: MyObjectsTableList) => ({
    ...state,
    objects: myObjects,
  }));

  private applyFilters(myObjects: MyObjectsTableList, filters: MyObjectsFilters | null): MyObjectsTableList {
    if (!filters) {
      return myObjects;
    }
    let myObjectsWithFilters = [...myObjects];
    for (const key in filters) {
      myObjectsWithFilters = filtersFunctions[key as keyof typeof filtersFunctions](myObjectsWithFilters, filters);
    }
    return myObjectsWithFilters;
  }
}
