import { stringToDate } from '@utils/functions';
import { BookingVM } from '../types/bookings.models';

export type BookingsStatusFilter =
  | ''
  | 'Ждут заселения'
  | 'Активные брони'
  | 'Не оплаченные'
  | 'Ждут подтверждения'
  | 'Гости проживают'
  | 'Возник спор'
  | 'Завершенные';

const bookingsStatusFilterFunctions = {
  'Ждут заселения': (bookings: BookingVM[]): BookingVM[] =>
    bookings.filter((booking) => booking.status === 'Ждут заселения'),
  'Ждут подтверждения': (bookings: BookingVM[]): BookingVM[] =>
    bookings.filter((booking) => booking.status === 'Ждут подтверждения'),
  'Гости проживают': (bookings: BookingVM[]): BookingVM[] =>
    bookings.filter((booking) => booking.status === 'Гости проживают'),
  'Возник спор': (bookings: BookingVM[]): BookingVM[] => bookings.filter((booking) => booking.status === 'Возник спор'),
  'Не оплаченные': (bookings: BookingVM[]): BookingVM[] => bookings.filter((booking) => booking.paid <= booking.amount),
  'Активные брони': (bookings: BookingVM[]): BookingVM[] =>
    bookings.filter((booking) => stringToDate(booking.departure).getTime() >= new Date().getTime()),
  Завершенные: (bookings: BookingVM[]): BookingVM[] =>
    bookings.filter((booking) => stringToDate(booking.departure).getTime() <= new Date().getTime()),
};

export const bookingsStatusFilter = (bookings: BookingVM[], type: BookingsStatusFilter): BookingVM[] => {
  if (type === '') return bookings;
  return bookingsStatusFilterFunctions[type](bookings);
};
