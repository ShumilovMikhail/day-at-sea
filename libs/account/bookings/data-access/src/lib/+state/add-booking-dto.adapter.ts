import { AddBookingDTO, AddBookingEntity } from '../types/bookings.models';

export interface AddBookingDTOAdapter {
  dtoToEntity: (booking: AddBookingDTO) => AddBookingEntity;
  entityToDTO: (booking: AddBookingEntity) => AddBookingDTO;
}

export const addBookingDTOAdapter = {
  dtoToEntity: (booking: AddBookingDTO): AddBookingEntity => {
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
      client: {
        fullName: booking.client.full_name,
        phone: booking.client.phone,
        email: booking.client.email,
      },
    };
  },
  entityToDTO: (booking: AddBookingEntity): AddBookingDTO => {
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
      client: {
        full_name: booking.client.fullName,
        phone: booking.client.phone,
        email: booking.client.email,
      },
    };
  },
};
