import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { ResponseError } from '@http';
import { SaveBookingDTO, BookingEntity } from '../types/bookings.models';
import { BookingsState } from '../types/bookings-state.models';
import { bookingsActions } from './bookings.actions';

export const bookingsAdapter: EntityAdapter<BookingEntity> = createEntityAdapter<BookingEntity>();

export const initialBookingsState: BookingsState = bookingsAdapter.getInitialState({
  status: 'init',
  error: null,
  isLoaded: false,
});

export const bookingsFeature = createFeature({
  name: 'Bookings',
  reducer: createReducer(
    initialBookingsState,
    on(
      bookingsActions.getBookings,
      (state: BookingsState, payload: { agencyId: number }): BookingsState => ({
        ...state,
        status: 'loading',
        error: null,
      })
    ),
    on(
      bookingsActions.getBookingsSuccess,
      (state: BookingsState, payload: { bookings: BookingEntity[] }): BookingsState =>
        bookingsAdapter.setAll(payload.bookings, {
          ...state,
          status: 'loaded',
          isLoaded: true,
        })
    ),
    on(
      bookingsActions.getBookingsFailure,
      (state: BookingsState, payload: { error: ResponseError }): BookingsState => ({
        ...state,
        status: 'error',
        error: payload.error,
      })
    ),

    on(
      bookingsActions.addBooking,
      (state: BookingsState, payload: { agencyId: number; booking: SaveBookingDTO }): BookingsState => ({
        ...state,
        status: 'loading',
      })
    ),
    on(
      bookingsActions.addBookingSuccess,
      (state: BookingsState, payload: { booking: BookingEntity }): BookingsState =>
        bookingsAdapter.addOne(payload.booking, {
          ...state,
          status: 'loaded',
        })
    ),
    on(
      bookingsActions.addBookingFailure,
      (state: BookingsState, payload: { error: ResponseError }): BookingsState => ({
        ...state,
        status: 'error',
        error: payload.error,
      })
    ),

    on(
      bookingsActions.updateBooking,
      (state: BookingsState, payload: { agencyId: number; booking: SaveBookingDTO }): BookingsState => ({
        ...state,
        status: 'loading',
      })
    ),
    on(
      bookingsActions.updateBookingSuccess,
      (state: BookingsState, payload: { booking: BookingEntity }): BookingsState =>
        bookingsAdapter.updateOne(
          { id: payload.booking.id, changes: payload.booking },
          {
            ...state,
            status: 'loaded',
          }
        )
    ),
    on(
      bookingsActions.updateBookingFailure,
      (state: BookingsState, payload: { error: ResponseError }): BookingsState => ({
        ...state,
        status: 'error',
        error: payload.error,
      })
    )
  ),
});
