export type MyObjectsDTO = MyObjectDTO[];

export interface MyObjectDTO {
  id: number;
  img: string;
  title: string;
  address: string;
  placement_type: string;
  booking_method: string;
  status: MyObjectStatusDTO;
  sales_channel: number | null;
  guest_count: string;
  prices: MyObjectPricesDTO[];
}

export interface MyObjectPricesDTO {
  price: string;
  weekend_discount: MyObjectWeekendDiscount;
}

export type MyObjectsEntity = MyObjectEntity[];

export interface MyObjectEntity {
  id: number;
  img: string;
  title: string;
  address: string;
  placementType: string;
  bookingMethod: string;
  status: MyObjectStatusEntity;
  salesChannelId: number | null;
  guestCount: string;
  prices: MyObjectPricesEntity[];
}

export interface MyObjectPricesEntity {
  price: string;
  weekendDiscount: MyObjectWeekendDiscount;
}

export type MyObjectsVM = MyObjectVM[];

export interface MyObjectVM {
  id: number;
  img: string;
  title: string;
  address: string;
  placementType: string;
  bookingMethod: string;
  status: MyObjectStatusEntity;
  salesChannel: string;
  guestCount: string;
  prices: MyObjectPricesVM[];
}

export interface MyObjectPricesVM {
  price: string;
  weekendDiscount: MyObjectWeekendDiscount;
}

export interface MyObjectWeekendDiscount {
  price: string;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export type MyObjectStatusDTO = 'active' | 'inactive';

export type MyObjectStatusEntity = 'активное' | 'неактивное';
