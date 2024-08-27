import { MyObjectVM } from '@account/my-objects/data-access';
import { BookingHistoryItemVM } from '../types/clients.models';
import { BookingHistoryItemEntity } from '@account/clients/data-access';

export const bookingEntityAdapter = {
  entityToVM: (bookings: BookingHistoryItemEntity[], myObjects: MyObjectVM[]): BookingHistoryItemVM[] => {
    return bookings.map((booking) => ({
      arrival: booking.arrival,
      departure: booking.departure,
      agencyObjectTitle: myObjects.find((myObject) => myObject.id === booking.agencyObjectId)?.title ?? '',
      amount: booking.amount,
      source: booking.source,
      note: booking.note,
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
    }));
  },
  // vmToXLSXFileData: (bookings: BookingVM[]): XLSXFileData => {
  //   return bookings.map((booking) => ({
  //     '№ объекта': booking.id,
  //     Объект: booking.agencyObjectTitle,
  //     Заезд: booking.arrival,
  //     Выезд: booking.departure,
  //     Гостей: booking.guestCount,
  //     Сумма: booking.amount,
  //     Примечание: booking.note,
  //     Источник: booking.source,
  //     Статус: booking.status,
  //   }));
  // },
};
