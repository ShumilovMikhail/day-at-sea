export interface MoveEntity {
  id: number;
  bookingId: number;
  type: MoveTypes;
  date: string;
  objectId: number;
  guestCount: number;
  amount: number;
}

export type MoveTypes = 'arrival' | 'departure';
