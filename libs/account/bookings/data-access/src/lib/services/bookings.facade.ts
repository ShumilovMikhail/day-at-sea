import { inject, Injectable } from '@angular/core';
import { combineLatestWith, filter, map, Observable, take, tap, withLatestFrom } from 'rxjs';
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
import { SaveBookingEntity, BookingEntity } from '../types/bookings.models';
import { bookingsActions } from '../+state/bookings.actions';
import { saveBookingDTOAdapter } from '../+state/save-booking-dto.adapter';

@Injectable({ providedIn: 'root' })
export class BookingsFacade {
  private readonly store = inject(Store);
  private readonly agencyFacade = inject(AgencyFacade);

  public readonly status$: Observable<BookingsStateStatus | null> = this.store.select(selectBookingsStatus);
  public readonly bookingsLoaded$: Observable<boolean> = this.store.select(selectBookingsLoaded);
  public readonly error$: Observable<ResponseError | null> = this.store.select(selectBookingsError);
  public readonly loading$: Observable<boolean> = this.store.select(selectBookingsLoading);
  public readonly bookings$: Observable<BookingEntity[]> = this.store.select(selectBookings).pipe(
    combineLatestWith(this.agencyFacade.id$),
    withLatestFrom(this.bookingsLoaded$),
    tap(([[bookings, agencyId], isLoaded]: [[BookingEntity[], number | null], boolean]) => {
      if (!isLoaded && agencyId) {
        this.store.dispatch(bookingsActions.getBookings({ agencyId }));
      }
    }),
    filter(([[bookings, agencyId], isLoaded]: [[BookingEntity[], number | null], boolean]) => isLoaded),
    map(([[bookings, agencyId], isLoaded]: [[BookingEntity[], number | null], boolean]) => {
      return bookings;
    })
  );

  public addBooking(booking: SaveBookingEntity): void {
    this.agencyFacade.id$
      .pipe(
        filter((id: number | null): id is number => Boolean(id)),
        take(1)
      )
      .subscribe((agencyId: number) => {
        this.store.dispatch(
          bookingsActions.addBooking({ agencyId, booking: saveBookingDTOAdapter.entityToDTO(booking) })
        );
      });
  }

  public updateBooking(booking: SaveBookingEntity): void {
    this.agencyFacade.id$
      .pipe(
        filter((id: number | null): id is number => Boolean(id)),
        take(1)
      )
      .subscribe((agencyId: number) => {
        this.store.dispatch(
          bookingsActions.updateBooking({ agencyId, booking: saveBookingDTOAdapter.entityToDTO(booking) })
        );
      });
  }
}
