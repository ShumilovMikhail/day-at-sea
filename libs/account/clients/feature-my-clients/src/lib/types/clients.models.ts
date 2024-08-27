export interface BookingHistoryItemVM {
  arrival: string;
  departure: string;
  agencyObjectTitle: string;
  amount: string;
  source: string;
  note: string;
}

export interface ClientVM {
  id: number;
  fullName: string;
  isVip: boolean;
  phone: string;
  email: string;
  bookingsCount: number;
  totalAmount: number;
  bookings: BookingHistoryItemVM[];
}
