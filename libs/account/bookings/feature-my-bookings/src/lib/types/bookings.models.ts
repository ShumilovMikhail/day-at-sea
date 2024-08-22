export interface BookingVM {
  id: number;
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
