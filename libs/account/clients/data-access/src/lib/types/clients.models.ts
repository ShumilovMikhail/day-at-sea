export interface ClientDTO {
  id: number;
  full_name: string;
  is_vip: boolean;
  phone: string;
  email: string;
  bookings_count: number;
  total_amount: number;
  bookings: BookingHistoryItemDTO[];
}

export interface ClientEntity {
  id: number;
  fullName: string;
  isVip: boolean;
  phone: string;
  email: string;
  bookingsCount: number;
  totalAmount: number;
  bookings: BookingHistoryItemEntity[];
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
