export interface ObjectPricesItemVM {
  name: string;
  price: string;
  minStay: number;
  discounts: DiscountsVM;
  weekendDiscount: WeekendDiscountVM;
  additionalGuests: AdditionalGuestsVM;
  onRequest: boolean;
  instant: boolean;
}

export interface DiscountsVM {
  durationStay: DurationStayDiscountItemVM[];
  lastMinuteBooking: LastMinuteBookingDiscountItemVM[];
  earlyBooking: EarlyBookingDiscountItemVM[];
}

export interface DurationStayDiscountItemVM {
  durationOver: number;
  discount: string;
  unit: string;
}

export interface EarlyBookingDiscountItemVM {
  beforeMonths: number;
  discount: string;
  unit: string;
}

export interface LastMinuteBookingDiscountItemVM {
  beforeDays: number;
  discount: string;
  unit: string;
}

export interface WeekendDiscountVM {
  price: string;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface AdditionalGuestsVM {
  overGuests: number;
  surcharge: string;
  unit: string;
}
