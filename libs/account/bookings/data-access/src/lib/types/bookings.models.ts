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
}

export interface Instalment {
  date: string;
  amount: number;
  commentary: string;
}
