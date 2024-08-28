import { MyObjectVM } from '@account/my-objects/data-access';
import { BookingHistoryItemVM } from '../types/clients.models';
import { BookingHistoryItemEntity } from '@account/clients/data-access';
import { getDaysCount } from './get-days-count';

export const bookingEntityAdapter = {
  entityToVM: (bookings: BookingHistoryItemEntity[], myObjects: MyObjectVM[]): BookingHistoryItemVM[] => {
    return bookings.map((booking) => ({
      arrival: booking.arrival,
      departure: booking.departure,
      agencyObjectTitle: myObjects.find((myObject) => myObject.id === booking.agencyObjectId)?.title ?? '',
      amount: booking.amount,
      source: booking.source,
      note: booking.note,
      status: booking.status,
      daysCount: getDaysCount(booking.arrival, booking.departure),
    }));
  },

  vmToEntity: (bookings: BookingHistoryItemVM[], myObjects: MyObjectVM[]): BookingHistoryItemEntity[] => {
    return bookings.map((booking) => ({
      arrival: booking.arrival,
      departure: booking.departure,
      agencyObjectId: myObjects.find((myObject) => myObject.title === booking.agencyObjectTitle)?.id ?? 0,
      amount: booking.amount,
      source: booking.source,
      note: booking.note,
      status: booking.status,
    }));
  },
};
