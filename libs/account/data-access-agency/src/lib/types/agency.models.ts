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
}

export interface AgencyEntity extends AgencyRequisitesEntity {
  id: number;
  contacts: Contacts;
}

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
