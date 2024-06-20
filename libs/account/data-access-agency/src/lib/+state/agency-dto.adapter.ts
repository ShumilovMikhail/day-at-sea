import { AgencyDTO, AgencyEntity } from '../types/agency.models';

export interface AgencyDTOAdapter {
  agencyDTOToEntity: (agencyDTO: AgencyDTO) => AgencyEntity;
}

export const agencyDTOAdapter: AgencyDTOAdapter = {
  agencyDTOToEntity: (agencyDTO: AgencyDTO): AgencyEntity => {
    return {
      id: agencyDTO.id,
      name: agencyDTO.name,
      contactPerson: agencyDTO.contact_person,
      phone: agencyDTO.phone,
      contacts: agencyDTO.contacts,
      city: agencyDTO.city,
      logo: agencyDTO.logo,
    };
  },
};
