import { BookingEntity } from '@account/bookings/data-access';
import { MyObjectVM } from '@account/my-objects/data-access';
import { BookingVM } from '../types/bookings.models';
import { XLSXFileData } from '@utils/files';
import { ClientEntity } from '@account/clients/data-access';

export const bookingEntityAdapter = {
  entityToVM: (bookings: BookingEntity[], myObjects: MyObjectVM[], clients: ClientEntity[]): BookingVM[] => {
    return bookings.map((booking) => ({
      id: booking.id,
      client: clients.find((client) => client.id == booking.clientId)?.fullName ?? '',
      agencyObjectTitle: myObjects.find((object) => object.id === booking.agencyObjectId)?.title || '',
      arrival: booking.arrival,
      departure: booking.departure,
      guestCount: booking.guestCount,
      amount: booking.amount,
      note: booking.note,
      source: booking.source,
      status: booking.status,
      paid: booking.paid,
    }));
  },
  vmToXLSXFileData: (bookings: BookingVM[]): XLSXFileData => {
    return bookings.map((booking) => ({
      '№ объекта': booking.id,
      Объект: booking.agencyObjectTitle,
      Клиент: booking.client,
      Заезд: booking.arrival,
      Выезд: booking.departure,
      Гостей: booking.guestCount,
      Сумма: booking.amount,
      Примечание: booking.note,
      Источник: booking.source,
      Статус: booking.status,
    }));
  },
};
