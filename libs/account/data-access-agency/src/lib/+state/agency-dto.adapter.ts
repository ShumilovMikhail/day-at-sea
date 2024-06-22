import {
  AgencyDTO,
  AgencyEntity,
  AgencyRequisitesDTO,
  AgencyRequisitesEntity,
  UpdateRequisitesRequestDTO,
  UpdateRequisitesRequestEntity,
} from '../types/agency.models';

export interface AgencyDTOAdapter {
  agencyDTOToEntity: (agencyDTO: AgencyDTO) => AgencyEntity;
  requisitesRequestEntityToDTO: (requisitesRequest: UpdateRequisitesRequestEntity) => UpdateRequisitesRequestDTO;
  requisitesDTOToEntity: (requisites: AgencyRequisitesDTO) => AgencyRequisitesEntity;
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

  requisitesRequestEntityToDTO: (requisitesRequest: UpdateRequisitesRequestEntity): UpdateRequisitesRequestDTO => {
    return {
      name: requisitesRequest.name,
      contact_person: requisitesRequest.contactPerson,
      phone: requisitesRequest.phone,
      city: requisitesRequest.city,
      logo: requisitesRequest.logo,
    };
  },

  requisitesDTOToEntity: (requisites: AgencyRequisitesDTO): AgencyRequisitesEntity => {
    return {
      name: requisites.name,
      contactPerson: requisites.contact_person,
      phone: requisites.phone,
      city: requisites.city,
      logo: requisites.logo,
    };
  },
};
