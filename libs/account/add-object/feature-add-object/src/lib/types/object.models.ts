export enum ObjectTypes {
  FLOOR = 'floor',
  HOUSE = 'house',
  ROOM = 'room',
}

export interface ObjectInfoVM {
  address: string;
  type?: string;
  countRoom?: number | string;
}
