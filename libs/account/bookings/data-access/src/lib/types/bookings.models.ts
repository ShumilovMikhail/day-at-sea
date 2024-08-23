export interface BookingDTO {
  id: number;
  agency_object_id: number;
  arrival: string;
  departure: string;
  guest_count: number;
  daily_price: number;
  amount: number;
  note: string;
  source: string;
  status: string;
  pledge: number;
  paid: number;
  instalments: Instalment[];
  client_id: number;
}

export interface BookingEntity {
  id: number;
  agencyObjectId: number;
  arrival: string;
  departure: string;
  guestCount: number;
  dailyPrice: number;
  amount: number;
  note: string;
  source: string;
  status: string;
  pledge: number;
  paid: number;
  instalments: Instalment[];
  clientId: number;
}

export interface BookingClientDTO {
  full_name: string;
  phone: string;
  email: string;
}

export interface BookingClientEntity {
  fullName: string;
  phone: string;
  email: string;
}

export interface Instalment {
  date: string;
  amount: number;
  commentary: string;
}

export interface SaveBookingEntity {
  id?: number;
  agencyObjectId: number;
  arrival: string;
  departure: string;
  guestCount: number;
  dailyPrice: number;
  amount: number;
  note: string;
  source: string;
  status: string;
  pledge: number;
  paid: number;
  instalments: Instalment[];
  client: BookingClientEntity | number;
}

export interface SaveBookingDTO {
  id?: number;
  agency_object_id: number;
  arrival: string;
  departure: string;
  guest_count: number;
  daily_price: number;
  amount: number;
  note: string;
  source: string;
  status: string;
  pledge: number;
  paid: number;
  instalments: Instalment[];
  client: BookingClientDTO | number;
}
