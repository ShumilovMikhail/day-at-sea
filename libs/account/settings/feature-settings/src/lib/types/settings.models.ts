export interface UserVM {
  username: string;
  email: string;
}

export interface ContactsVM {
  phones: string | null;
  site: string | null;
  vk: string | null;
  ok: string | null;
  whatsapp: string | null;
  telegram: string | null;
  viber: string | null;
}
export interface AgencyRulesVM {
  arrivalTime: string | null;
  departureTime: string | null;
  limitations: RulesLimitation[];
  additionally: string | null;
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

export interface AgencyVM {
  name: string | null;
  city: string | null;
  contactPerson: string | null;
  phone: string | null;
  contacts: ContactsVM;
  logo: string | null;
  rules: AgencyRulesVM;
}
