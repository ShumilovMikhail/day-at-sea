export interface UserVM {
  login: string;
  email: string;
}

export interface ContactsVM {
  phones: string[] | null;
  site: string | null;
  vk: string | null;
  ok: string | null;
  whatsapp: string | null;
  telegram: string | null;
  viber: string | null;
}

export interface AgencyVM {
  name: string | null;
  city: string | null;
  contactPerson: string | null;
  phone: string | null;
  contacts: ContactsVM;
}
