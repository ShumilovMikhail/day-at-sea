import { BookingHistoryItemDTO, BookingHistoryItemEntity } from '../types/clients.models';

export interface BookingHistoryDTOAdapter {
  dtoToEntity: (bookingHistoryItem: BookingHistoryItemDTO) => BookingHistoryItemEntity;
  entityToDTO: (bookingHistoryItem: BookingHistoryItemEntity) => BookingHistoryItemDTO;
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
      status: bookingHistoryItem.status,
    };
  },
  entityToDTO: (bookingHistoryItem: BookingHistoryItemEntity): BookingHistoryItemDTO => {
    return {
      arrival: bookingHistoryItem.arrival,
      departure: bookingHistoryItem.departure,
      agency_object_id: bookingHistoryItem.agencyObjectId,
      amount: bookingHistoryItem.amount,
      source: bookingHistoryItem.source,
      note: bookingHistoryItem.note,
      status: bookingHistoryItem.status,
    };
  },
};
