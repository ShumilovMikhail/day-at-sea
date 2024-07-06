import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface ObjectPricesItemVM {
  name: FormControl<string>;
  price: FormControl<string>;
  minStay: FormControl<number>;
  discounts: FormGroup<DiscountsVM>;
  weekendDiscount: FormGroup<WeekendDiscountVM>;
  additionalGuests: FormGroup<AdditionalGuestsVM>;
  onRequest: FormControl<boolean>;
  instant: FormControl<boolean>;
}

export interface DiscountsVM {
  durationStay: FormArray<FormGroup<DurationStayDiscountItemVM>>;
  lastMinuteBooking: FormArray<FormGroup<LastMinuteBookingDiscountItemVM>>;
  earlyBooking: FormArray<FormGroup<EarlyBookingDiscountItemVM>>;
}

export interface DurationStayDiscountItemVM {
  durationOver: FormControl<number>;
  discount: FormControl<string>;
  unit: FormControl<string>;
}

export interface EarlyBookingDiscountItemVM {
  beforeMonths: FormControl<number>;
  discount: FormControl<string>;
  unit: FormControl<string>;
}

export interface LastMinuteBookingDiscountItemVM {
  beforeDays: FormControl<number>;
  discount: FormControl<string>;
  unit: FormControl<string>;
}

export interface WeekendDiscountVM {
  price: FormControl<string>;
  friday: FormControl<boolean>;
  saturday: FormControl<boolean>;
  sunday: FormControl<boolean>;
}

export interface AdditionalGuestsVM {
  overGuests: FormControl<number>;
  surcharge: FormControl<string>;
  unit: FormControl<string>;
}

export interface PriceVM {
  price: FormControl<string>;
  minStay: FormControl<number>;
}
