import { SalesChannelRequestDTO, SalesChannelRequestEntity } from '../types/agency-state.models';
import {
  AgencyDTO,
  AgencyEntity,
  AgencyRequisitesDTO,
  AgencyRequisitesEntity,
  AgencyRulesDTO,
  AgencyRulesEntity,
  SalesChannelDTO,
  SalesChannelEntity,
  UpdateRequisitesRequestDTO,
  UpdateRequisitesRequestEntity,
} from '../types/agency.models';

export interface AgencyDTOAdapter {
  agencyDTOToEntity: (agencyDTO: AgencyDTO) => AgencyEntity;
  requisitesRequestEntityToDTO: (requisitesRequest: UpdateRequisitesRequestEntity) => UpdateRequisitesRequestDTO;
  requisitesDTOToEntity: (requisites: AgencyRequisitesDTO) => AgencyRequisitesEntity;
  salesChannelEntityToDTO: (salesChannel: SalesChannelEntity) => SalesChannelDTO;
  salesChannelDTOToEntity: (salesChannel: SalesChannelDTO) => SalesChannelEntity;
  salesChannelDTOToRequestDTO: (salesChannel: SalesChannelDTO) => SalesChannelRequestDTO;
  salesChannelRequestEntityToDTO: (salesChannelRequest: SalesChannelRequestEntity) => SalesChannelRequestDTO;
  rulesEntityToDTO: (rules: AgencyRulesEntity) => AgencyRulesDTO;
  rulesDTOToEntity: (rules: AgencyRulesDTO) => AgencyRulesEntity;
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
      salesChannels: agencyDTO.sales_channels.map((salesChannel: SalesChannelDTO): SalesChannelEntity => {
        return {
          id: salesChannel.id,
          channel: salesChannel.channel,
          title: salesChannel.title,
          accountId: salesChannel.account_id,
          status: salesChannel.status,
        };
      }),
      rules: {
        arrivalTime: agencyDTO.rules.arrival_time,
        departureTime: agencyDTO.rules.departure_time,
        limitations: agencyDTO.rules.limitations,
        additionally: agencyDTO.rules.additionally,
        seasons: agencyDTO.rules.seasons,
      },
    };
  },

  rulesEntityToDTO: (rules: AgencyRulesEntity): AgencyRulesDTO => {
    return {
      arrival_time: rules.arrivalTime,
      departure_time: rules.departureTime,
      limitations: rules.limitations,
      additionally: rules.additionally,
      seasons: rules.seasons,
    };
  },

  rulesDTOToEntity: (rules: AgencyRulesDTO): AgencyRulesEntity => {
    return {
      arrivalTime: rules.arrival_time,
      departureTime: rules.departure_time,
      limitations: rules.limitations,
      additionally: rules.additionally,
      seasons: rules.seasons,
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

  salesChannelEntityToDTO: (salesChannel: SalesChannelEntity): SalesChannelDTO => {
    return {
      id: salesChannel.id,
      channel: salesChannel.channel,
      title: salesChannel.title,
      account_id: salesChannel.accountId,
      status: salesChannel.status,
    };
  },

  salesChannelDTOToEntity: (salesChannel: SalesChannelDTO): SalesChannelEntity => {
    return {
      id: salesChannel.id,
      channel: salesChannel.channel,
      title: salesChannel.title,
      accountId: salesChannel.account_id,
      status: salesChannel.status,
    };
  },
  salesChannelDTOToRequestDTO: (salesChannel: SalesChannelDTO): SalesChannelRequestDTO => {
    return {
      channel: salesChannel.channel,
      title: salesChannel.title,
      account_id: salesChannel.account_id,
      status: salesChannel.status,
    };
  },
  salesChannelRequestEntityToDTO: (salesChannelRequest: SalesChannelRequestEntity): SalesChannelRequestDTO => {
    return {
      channel: salesChannelRequest.channel,
      title: salesChannelRequest.title,
      account_id: salesChannelRequest.accountId,
      status: salesChannelRequest.status,
    };
  },
};
