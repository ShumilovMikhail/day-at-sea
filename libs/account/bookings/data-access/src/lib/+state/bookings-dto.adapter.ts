import { BookingDTO, BookingEntity } from '../types/bookings.models';

export interface BookingsDTOAdapter {
  dtoToEntity: (booking: BookingDTO) => BookingEntity;
  entityToDTO: (booking: BookingEntity) => BookingDTO;
}

export const bookingsDTOAdapter = {
  dtoToEntity: (booking: BookingDTO): BookingEntity => {
    return {
      id: booking.id,
      agencyObjectId: booking.agency_object_id,
      arrival: booking.arrival,
      departure: booking.departure,
      guestCount: booking.guest_count,
      dailyPrice: booking.daily_price,
      amount: booking.amount,
      note: booking.note,
      source: booking.source,
      status: booking.status,
      pledge: booking.pledge,
      paid: booking.paid,
      instalments: booking.instalments,
    };
  },
  entityToDTO: (booking: BookingEntity): BookingDTO => {
    return {
      id: booking.id,
      agency_object_id: booking.agencyObjectId,
      arrival: booking.arrival,
      departure: booking.departure,
      guest_count: booking.guestCount,
      daily_price: booking.dailyPrice,
      amount: booking.amount,
      note: booking.note,
      source: booking.source,
      status: booking.status,
      pledge: booking.pledge,
      paid: booking.paid,
      instalments: booking.instalments,
    };
  },
};
