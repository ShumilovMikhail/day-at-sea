import { BookingEntity, BookingsFacade } from '@account/bookings/data-access';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, combineLatestWith, map, Observable, of, Subject } from 'rxjs';
import { MyBookingsFilters } from '../types/filters.models';
import { MyObjectsFacade, MyObjectVM } from '@account/my-objects/data-access';
import { BookingsStatusFilter, bookingsStatusFilter } from '../utils/bookings-status-filter';
import { BookingVM } from '../types/bookings.models';
import { bookingEntityAdapter } from '../utils/booking-entity.adapter';
import { ClientEntity, ClientsFacade } from '@account/clients/data-access';

const filtersFunctions = {
  status: (bookings: BookingVM[], { status }: { status: string }) =>
    bookingsStatusFilter(bookings, status as BookingsStatusFilter),
  title: (bookings: BookingVM[], { title }: { title: string }) =>
    bookings.filter((bookings) => bookings.agencyObjectTitle.toLowerCase().includes(title.toLowerCase())),
  source: (bookings: BookingVM[], { source }: { source: string }) =>
    bookings.filter((bookings) => (source !== '' ? bookings.source === source : bookings)),
  amount: (bookings: BookingVM[], { amount }: { amount: string }) =>
    bookings.filter((bookings) => (amount ? +bookings.amount <= +amount : bookings)),
};

@Injectable()
export class MyBookingsService {
  private readonly clientsFacade = inject(ClientsFacade);
  private readonly bookingsFacade = inject(BookingsFacade);
  private readonly myObjectsFacade = inject(MyObjectsFacade);
  private readonly bookingsEntity$: Observable<BookingEntity[]> = this.bookingsFacade.bookings$;
  private readonly filters$: Subject<MyBookingsFilters | null> = new BehaviorSubject<MyBookingsFilters | null>(null);

  public readonly bookingsWithFilters$ = combineLatest([this.bookingsEntity$, this.filters$]).pipe(
    combineLatestWith(this.myObjectsFacade.myObjectsVM$, this.clientsFacade.clients$),
    map(
      ([[bookings, filters], myObjects, clients]: [
        [BookingEntity[], MyBookingsFilters | null],
        MyObjectVM[],
        ClientEntity[]
      ]): [BookingVM[], MyBookingsFilters | null] => {
        return [bookingEntityAdapter.entityToVM(bookings, myObjects, clients), filters];
      }
    ),
    map(([bookings, filters]: [BookingVM[], MyBookingsFilters | null]) => {
      return this.applyFilters(bookings, filters);
    })
  );

  public setFilters(filters: MyBookingsFilters): void {
    this.filters$.next(filters);
  }

  private applyFilters(bookings: BookingVM[], filters: MyBookingsFilters | null): BookingVM[] {
    if (!filters) {
      return bookings;
    }
    let bookingsWithFilters = [...bookings];
    for (const key in filters) {
      bookingsWithFilters = filtersFunctions[key as keyof typeof filtersFunctions](bookingsWithFilters, filters);
    }
    return bookingsWithFilters;
  }
}
