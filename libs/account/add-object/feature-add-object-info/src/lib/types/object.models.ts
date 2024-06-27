export enum ObjectTypes {
  FLAT = 'flat',
  HOUSE = 'house',
  ROOM = 'room',
}

export interface ObjectInfoVM {
  address: string;
  placement: string;
  type: string;
}
