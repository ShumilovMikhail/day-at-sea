export interface ClientDTO {
  id: number;
  full_name: string;
  is_vip: boolean;
  phone: string;
  email: string;
}

export interface ClientEntity {
  id: number;
  fullName: string;
  isVip: boolean;
  phone: string;
  email: string;
}

export interface BookingHistoryItemDTO {
  arrival: string;
  departure: string;
  agency_object_id: number;
  amount: string;
  source: string;
  note: string;
}

export interface BookingHistoryItemEntity {
  arrival: string;
  departure: string;
  agencyObjectId: number;
  amount: string;
  source: string;
  note: string;
}
