import { createActionGroup, props } from '@ngrx/store';

import { ResponseError } from '@http';
import { SaveBookingDTO, BookingEntity } from '../types/bookings.models';

export const bookingsActions = createActionGroup({
  source: 'Bookings',
  events: {
    getBookings: props<{ agencyId: number }>(),
    updateBooking: props<{ agencyId: number; booking: SaveBookingDTO }>(),
    addBooking: props<{ agencyId: number; booking: SaveBookingDTO }>(),

    getBookingsSuccess: props<{ bookings: BookingEntity[] }>(),
    addBookingSuccess: props<{ booking: BookingEntity }>(),
    updateBookingSuccess: props<{ booking: BookingEntity }>(),

    getBookingsFailure: props<{ error: ResponseError }>(),
    addBookingFailure: props<{ error: ResponseError }>(),
    updateBookingFailure: props<{ error: ResponseError }>(),
  },
});
