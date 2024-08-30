export interface BookingVM {
  id: number;
  client: string;
  agencyObjectTitle: string;
  arrival: string;
  departure: string;
  guestCount: number;
  amount: number;
  note: string;
  source: string;
  status: string;
  paid: number;
}
