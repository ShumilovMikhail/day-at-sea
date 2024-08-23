import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ApiService, ResponseError } from '@http';
import { bookingsActions } from './bookings.actions';
import { SaveBookingDTO, BookingDTO, BookingEntity } from '../types/bookings.models';
import { bookingsDTOAdapter } from './bookings-dto.adapter';

export const getBookingsEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(bookingsActions.getBookings),
      switchMap(({ agencyId }: { agencyId: number }) => {
        return apiService.get<BookingDTO[] | BookingDTO>(`agencies/${agencyId}/bookings`).pipe(
          map((bookingsDTO: BookingDTO[] | BookingDTO) => {
            let bookings: BookingEntity[] = [];
            if (Array.isArray(bookingsDTO)) {
              bookings = bookingsDTO.map((booking) => bookingsDTOAdapter.dtoToEntity(booking));
            } else {
              bookings.push(bookingsDTOAdapter.dtoToEntity(bookingsDTO));
            }
            return bookingsActions.getBookingsSuccess({ bookings });
          }),
          catchError((error: ResponseError) => {
            return of(bookingsActions.getBookingsFailure({ error }));
          })
        );
      })
    ),
  { functional: true }
);

export const addBookingEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(bookingsActions.addBooking),
      switchMap(({ agencyId, booking }: { agencyId: number; booking: SaveBookingDTO }) => {
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

export const addBookingSuccessEffect$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(bookingsActions.addBookingSuccess),
      tap(() => {
        router.navigateByUrl('/account/bookings');
      })
    ),
  { functional: true, dispatch: false }
);

export const updateBookingEffect$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) =>
    actions$.pipe(
      ofType(bookingsActions.updateBooking),
      switchMap(({ agencyId, booking }: { agencyId: number; booking: SaveBookingDTO }) => {
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

export const updateBookingSuccessEffect$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(bookingsActions.updateBookingSuccess),
      tap(() => {
        router.navigateByUrl('/account/bookings');
      })
    ),
  { functional: true, dispatch: false }
);
