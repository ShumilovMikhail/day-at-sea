import { BookingEntity } from '@account/bookings/data-access';
import { BookingHistoryItemEntity } from '../types/clients.models';

export const bookingEntityAdapter = {
  entityToBookingHistoryItemEntity: (booking: BookingEntity): BookingHistoryItemEntity => {
    return {
      arrival: booking.arrival,
      departure: booking.departure,
      agencyObjectId: booking.agencyObjectId,
      amount: `${booking.amount}`,
      source: booking.source,
      status: booking.status,
      note: booking.note,
    };
  },
};
