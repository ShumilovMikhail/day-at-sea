export type MyObjectsDTO = MyObjectDTO[];

export interface MyObjectDTO {
  id: number;
  img: string;
  title: string;
  address: string;
  placement_type: string;
  booking_method: string;
  status: string;
  sales_channel: number | null;
  guest_count: string;
}

export type MyObjectsEntity = MyObjectEntity[];

export interface MyObjectEntity {
  id: number;
  img: string;
  title: string;
  address: string;
  placementType: string;
  bookingMethod: string;
  status: string;
  salesChannelId: number | null;
  guestCount: string;
}
