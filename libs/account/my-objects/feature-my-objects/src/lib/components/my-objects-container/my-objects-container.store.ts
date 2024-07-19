import { ComponentStore } from '@ngrx/component-store';
import { MyObjectsFilters, MyObjectsState } from '../../types/my-objects-state';
import { inject } from '@angular/core';
import { MyObjectsFacade } from '@account/my-objects/data-access';
import { MyObjectsTableList, MyObjectsVM, MyObjectTableItem } from '../../types/my-objects-vm.models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';
import { myObjectsEntityAdapter } from './my-objects-entity.adapter';

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

  constructor() {
    super(initialState);
    this.myObjectsFacade.myObjectsVM$
      .pipe(takeUntilDestroyed())
      .pipe(map((myObjects: MyObjectsVM): MyObjectsTableList => myObjectsEntityAdapter.entityToVM(myObjects)))
      .subscribe((myObjects: MyObjectsTableList) => {
        this.setMyObjects(myObjects);
      });
  }

  public setFilters = this.updater((state: MyObjectsState, filters: MyObjectsFilters) => ({
    ...state,
    filters: filters,
  }));

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
