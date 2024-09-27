import { BookingEntity } from '@account/bookings/data-access';
import { MyObjectVM } from '@account/my-objects/data-access';
import { XLSXFileData } from '@utils/files';
import { MoveEntity } from '@account/move/data-access';
import { MoveVM } from '../types/moving.models';

export const moveEntityAdapter = {
  entityToVM: (moving: MoveEntity[], myObjects: MyObjectVM[], bookings: BookingEntity[]): MoveVM[] => {
    return moving.map((move) => ({
      id: move.id,
      bookingId: move.bookingId,
      type: move.type === 'arrival' ? 'Заезд' : 'Выезд',
      date: move.date,
      objectTitle: myObjects.find((myObject) => myObject.id == move.objectId)?.title ?? '',
      guestCount: bookings.find((booking) => booking.id == move.bookingId)?.guestCount ?? 0,
      amount: bookings.find((booking) => booking.id == move.bookingId)?.amount ?? 0,
    }));
  },
  vmToXLSXFileData: (moving: MoveVM[]): XLSXFileData => {
    return moving.map((move) => ({
      '№ брони': move.bookingId,
      'Заезд/выезд': move.type,
      Время: move.date,
      Объект: move.objectTitle,
      Гостей: move.guestCount,
      Сумма: move.amount,
    }));
  },
};
