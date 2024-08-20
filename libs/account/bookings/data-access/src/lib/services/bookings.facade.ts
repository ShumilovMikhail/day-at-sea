import { inject } from '@angular/core';
import { combineLatestWith, filter, map, Observable, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { AgencyFacade } from '@account/data-access-agency';
import { BookingsStateStatus } from '../types/bookings-state.models';
import {
  selectBookings,
  selectBookingsError,
  selectBookingsLoaded,
  selectBookingsLoading,
  selectBookingsStatus,
} from '../+state/bookings.selectors';
import { ResponseError } from '@http';
import { BookingEntity } from '../types/bookings.models';
import { bookingsActions } from '../+state/bookings.actions';
import { bookingsDTOAdapter } from '../+state/bookings-dto.adapter';

export class BookingsFacade {
  private readonly store = inject(Store);
  private readonly agencyFacade = inject(AgencyFacade);

  public readonly status$: Observable<BookingsStateStatus | null> = this.store.select(selectBookingsStatus);
  public readonly bookingsLoaded$: Observable<boolean> = this.store.select(selectBookingsLoaded);
  public readonly error$: Observable<ResponseError | null> = this.store.select(selectBookingsError);
  public readonly loading$: Observable<boolean> = this.store.select(selectBookingsLoading);
  public readonly myObjectsEntity$: Observable<BookingEntity[]> = this.store.select(selectBookings).pipe(
    combineLatestWith(this.bookingsLoaded$, this.agencyFacade.id$),
    tap(([bookings, isLoaded, agencyId]: [BookingEntity[], boolean, number | null]) => {
      if (!isLoaded && agencyId) {
        this.store.dispatch(bookingsActions.getBookings({ agencyId }));
      }
    }),
    filter(([bookings, isLoaded, agencyId]: [BookingEntity[], boolean, number | null]) => isLoaded),
    map(([bookings, isLoaded, agencyId]: [BookingEntity[], boolean, number | null]) => {
      return bookings;
    })
  );

  public addBooking(booking: BookingEntity): void {
    this.agencyFacade.id$
      .pipe(
        filter((id: number | null): id is number => Boolean(id)),
        take(1)
      )
      .subscribe((agencyId: number) => {
        this.store.dispatch(bookingsActions.addBooking({ agencyId, booking: bookingsDTOAdapter.entityToDTO(booking) }));
      });
  }

  public updateMyObject(booking: BookingEntity): void {
    this.agencyFacade.id$
      .pipe(
        filter((id: number | null): id is number => Boolean(id)),
        take(1)
      )
      .subscribe((agencyId: number) => {
        this.store.dispatch(
          bookingsActions.updateBooking({ agencyId, booking: bookingsDTOAdapter.entityToDTO(booking) })
        );
      });
  }
}
