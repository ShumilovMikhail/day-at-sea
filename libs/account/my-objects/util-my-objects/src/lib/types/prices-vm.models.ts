export interface PricesVM {
  price: string;
  weekendDiscount: WeekendDiscountVM;
}

export interface WeekendDiscountVM {
  price: string;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}
