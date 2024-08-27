import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay, Subject, take, withLatestFrom } from 'rxjs';

import { MyClientsFilters } from '../types/filters.models';
import { MyObjectsFacade, MyObjectsVM, MyObjectVM } from '@account/my-objects/data-access';
import { ClientVM } from '../types/clients.models';
import { bookingEntityAdapter } from '../utils/booking-history-entity.adapter';
import { ClientEntity, ClientsFacade } from '@account/clients/data-access';

const filtersIsVipFunctions = {
  VIP: (clients: ClientVM[]) => clients.filter((client) => client.isVip),
  Обычные: (clients: ClientVM[]) => clients.filter((client) => !client.isVip),
  '': (clients: ClientVM[]) => [...clients],
};

const filtersFunctions = {
  fullName: (clients: ClientVM[], { fullName }: { fullName: string }) =>
    clients.filter((client) => client.fullName.toLowerCase().includes(fullName.toLowerCase())),
  isVip: (clients: ClientVM[], { isVip }: { isVip: string }) =>
    filtersIsVipFunctions[isVip as keyof typeof filtersIsVipFunctions](clients),
  objectTitle: (clients: ClientVM[], { objectTitle }: { objectTitle: string }) =>
    objectTitle
      ? clients.filter(
          (client) => client.bookings.findIndex((booking) => booking.agencyObjectTitle === objectTitle) !== -1
        )
      : clients,
  bookingsCount: (clients: ClientVM[], { bookingsCount }: { bookingsCount: number }) =>
    clients.filter((clients) => (bookingsCount !== null ? clients.bookingsCount >= bookingsCount : clients)),
};

@Injectable()
export class MyClientsService {
  private readonly clientsFacade = inject(ClientsFacade);
  private readonly myObjectsFacade = inject(MyObjectsFacade);
  private readonly clientsEntity$: Observable<ClientEntity[]> = this.clientsFacade.clients$;
  private readonly filters$: Subject<MyClientsFilters | null> = new BehaviorSubject<MyClientsFilters | null>(null);
  private readonly myObjects$: Observable<MyObjectsVM> = this.myObjectsFacade.myObjectsVM$.pipe(shareReplay(1));

  public readonly objectsTitle$: Observable<string[]> = this.myObjects$.pipe(
    map((objects) => objects.map((object) => object.title))
  );
  public readonly clientsWithFilters$ = combineLatest([this.clientsEntity$, this.filters$]).pipe(
    withLatestFrom(this.myObjects$),
    map(
      ([[clients, filters], myObjects]: [[ClientEntity[], MyClientsFilters | null], MyObjectVM[]]): [
        ClientVM[],
        MyClientsFilters | null
      ] => {
        return [
          clients.map((client) => ({
            ...client,
            bookings: bookingEntityAdapter.entityToVM(client.bookings, myObjects),
          })),
          filters,
        ];
      }
    ),
    map(([clients, filters]: [ClientVM[], MyClientsFilters | null]) => {
      return this.applyFilters(clients, filters);
    }),
    map((clients: ClientVM[]) => {
      return clients.sort((a, b) => a.id - b.id);
    })
  );

  public setFilters(filters: MyClientsFilters): void {
    this.filters$.next(filters);
  }

  public updateClient(client: ClientVM): void {
    this.myObjects$.pipe(take(1)).subscribe((myObjects) => {
      const clientEntity = {
        ...client,
        bookings: bookingEntityAdapter.vmToEntity(client.bookings, myObjects),
      };
      this.clientsFacade.updateClient(clientEntity);
    });
  }

  private applyFilters(clients: ClientVM[], filters: MyClientsFilters | null): ClientVM[] {
    if (!filters) {
      return clients;
    }
    let clientsWithFilters = [...clients];
    for (const key in filters) {
      clientsWithFilters = filtersFunctions[key as keyof typeof filtersFunctions](clientsWithFilters, filters);
    }
    return clientsWithFilters;
  }
}
