import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ApiService, ResponseError } from '@http';
import { bookingsActions } from './bookings.actions';
import { BookingDTO, BookingEntity } from '../types/bookings.models';
import { bookingsDTOAdapter } from './bookings-dto.adapter';

export const getBookingsEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(bookingsActions.getBookings),
      switchMap(({ agencyId }: { agencyId: number }) => {
        return apiService.get<BookingDTO[]>(`agencies/${agencyId}/bookings`).pipe(
          map((bookingsDTO: BookingDTO[]) => {
            const bookings: BookingEntity[] = bookingsDTO.map((booking) => bookingsDTOAdapter.dtoToEntity(booking));
            return bookingsActions.getBookingsSuccess({ bookings });
          }),
          catchError((error: ResponseError) => of(bookingsActions.getBookingsFailure({ error })))
        );
      })
    ),
  { functional: true }
);

export const addBookingEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(bookingsActions.addBooking),
      switchMap(({ agencyId, booking }: { agencyId: number; booking: BookingDTO }) => {
        return apiService.post<BookingDTO>(`agencies/${agencyId}/bookings`, booking).pipe(
          map((bookingDTO: BookingDTO) => {
            const booking: BookingEntity = bookingsDTOAdapter.dtoToEntity(bookingDTO);
            return bookingsActions.addBookingSuccess({ booking });
          }),
          catchError((error: ResponseError) => of(bookingsActions.addBookingFailure({ error })))
        );
      })
    ),
  { functional: true }
);

export const updateBookingEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(bookingsActions.updateBooking),
      switchMap(({ agencyId, booking }: { agencyId: number; booking: BookingDTO }) => {
        return apiService.put<BookingDTO>(`agencies/${agencyId}/bookings`, booking).pipe(
          map((bookingDTO: BookingDTO) => {
            const booking: BookingEntity = bookingsDTOAdapter.dtoToEntity(bookingDTO);
            return bookingsActions.updateBookingSuccess({ booking });
          }),
          catchError((error: ResponseError) => of(bookingsActions.updateBookingFailure({ error })))
        );
      })
    ),
  { functional: true }
);