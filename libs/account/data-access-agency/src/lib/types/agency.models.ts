export interface Contacts {
  phones: string[] | null;
  site: string | null;
  vk: string | null;
  ok: string | null;
  whatsapp: string | null;
  telegram: string | null;
  viber: string | null;
}

export interface AgencyRequisitesDTO {
  name: string | null;
  contact_person: string;
  city: string | null;
  phone: string | null;
  logo: string;
}

export interface AgencyRequisitesEntity {
  name: string | null;
  contactPerson: string;
  city: string | null;
  phone: string | null;
  logo: string;
}

export interface AgencyDTO extends AgencyRequisitesDTO {
  id: number;
  contacts: Contacts;
  sales_channels: SalesChannelDTO[];
  rules: AgencyRulesDTO;
}

export interface AgencyEntity extends AgencyRequisitesEntity {
  id: number;
  contacts: Contacts;
  salesChannels: SalesChannelEntity[];
  rules: AgencyRulesEntity;
}

export interface SalesChannelEntity {
  id: number;
  channel: string;
  title: string;
  accountId: number;
  status: ChannelStatusType;
}

export interface SalesChannelDTO {
  id: number;
  channel: string;
  title: string;
  account_id: number;
  status: ChannelStatusType;
}

export type ChannelStatusType = 'active' | 'inactive';

export interface UpdateRequisitesRequestEntity {
  name: string | null;
  contactPerson: string | null;
  city: string | null;
  phone: string | null;
  logo: string | ArrayBuffer | null;
}

export interface UpdateRequisitesRequestDTO {
  name: string | null;
  contact_person: string | null;
  city: string | null;
  phone: string | null;
  logo: string | ArrayBuffer | null;
}

export interface AgencyRulesDTO {
  arrival_time: string;
  departure_time: string;
  limitations: RulesLimitation[];
  additionally: string;
  seasons: RulesSeason[];
}

export interface AgencyRulesEntity {
  arrivalTime: string;
  departureTime: string;
  limitations: RulesLimitation[];
  additionally: string;
  seasons: RulesSeason[];
}

export interface RulesLimitation {
  via: number;
  term: number;
}

export interface RulesSeason {
  title: string;
  start: string;
  end: string;
}
