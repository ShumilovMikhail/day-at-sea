import { ClientDTO, ClientEntity } from '../types/clients.models';
import { bookingHistoryDTOAdapter } from './booking-history-dto.adapter';

export interface ClientsDTOAdapter {
  dtoToEntity: (client: ClientDTO) => ClientEntity;
  entityToDTO: (client: ClientEntity) => ClientDTO;
}

export const clientsDTOAdapter: ClientsDTOAdapter = {
  dtoToEntity: (client: ClientDTO): ClientEntity => {
    return {
      id: client.id,
      fullName: client.full_name,
      isVip: client.is_vip,
      phone: client.phone,
      email: client.email,
      totalAmount: client.total_amount,
      bookingsCount: client.bookings_count,
      bookings: client.bookings.map((booking) => bookingHistoryDTOAdapter.dtoToEntity(booking)),
    };
  },
  entityToDTO: (client: ClientEntity): ClientDTO => {
    return {
      id: client.id,
      full_name: client.fullName,
      is_vip: client.isVip,
      phone: client.phone,
      email: client.email,
      total_amount: client.totalAmount,
      bookings_count: client.bookingsCount,
      bookings: client.bookings.map((booking) => bookingHistoryDTOAdapter.entityToDTO(booking)),
    };
  },
};
