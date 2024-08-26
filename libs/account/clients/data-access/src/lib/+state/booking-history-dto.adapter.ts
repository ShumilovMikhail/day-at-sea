import { BookingHistoryItemDTO, BookingHistoryItemEntity } from '../types/clients.models';

export interface BookingHistoryDTOAdapter {
  dtoToEntity: (bookingHistoryItem: BookingHistoryItemDTO) => BookingHistoryItemEntity;
}

export const bookingHistoryDTOAdapter = {
  dtoToEntity: (bookingHistoryItem: BookingHistoryItemDTO): BookingHistoryItemEntity => {
    return {
      arrival: bookingHistoryItem.arrival,
      departure: bookingHistoryItem.departure,
      agencyObjectId: bookingHistoryItem.agency_object_id,
      amount: bookingHistoryItem.amount,
      source: bookingHistoryItem.source,
      note: bookingHistoryItem.note,
    };
  },
};
