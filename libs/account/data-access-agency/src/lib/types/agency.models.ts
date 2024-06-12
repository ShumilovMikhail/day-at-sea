export interface Contacts {
  phones: string[] | null;
  site: string | null;
  vk: string | null;
  ok: string | null;
  whatsapp: string | null;
  telegram: string | null;
  viber: string | null;
}

export interface AgencyDTO {
  id: number;
  name: string | null;
  contact_person: string;
  city: string | null;
  phone: string | null;
  contacts: Contacts;
}

export interface AgencyEntity {
  id: number;
  name: string | null;
  contactPerson: string;
  city: string | null;
  phone: string | null;
  contacts: Contacts;
}
