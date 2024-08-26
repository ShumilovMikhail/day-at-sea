import { ClientDTO, ClientEntity } from '../types/clients.models';

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
    };
  },
  entityToDTO: (client: ClientEntity): ClientDTO => {
    return {
      id: client.id,
      full_name: client.fullName,
      is_vip: client.isVip,
      phone: client.phone,
      email: client.email,
    };
  },
};
