export interface MoveVM {
  id: number;
  bookingId: number;
  type: MoveVMTypes;
  date: string;
  objectTitle: string;
  guestCount: number;
  amount: number;
}

export type MoveVMTypes = 'Заезд' | 'Выезд';
