export type MyObjectsVM = MyObjectVM[];

export interface MyObjectVM {
  id: number;
  img: string;
  title: string;
  address: string;
  placementType: string;
  bookingMethod: string;
  status: string;
  salesChannel: string;
  guestCount: string;
  prices: MyObjectPricesVM[];
}

export interface MyObjectPricesVM {
  price: string;
  weekendDiscount: MyObjectWeekendDiscountVM;
}

export interface MyObjectWeekendDiscountVM {
  price: string;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export type MyObjectsTableList = MyObjectTableItem[];

export interface MyObjectTableItem {
  id: number;
  img: string;
  title: string;
  address: string;
  placementType: string;
  bookingMethod: string;
  status: string;
  salesChannel: string;
  guestCount: string;
  price: string;
}
