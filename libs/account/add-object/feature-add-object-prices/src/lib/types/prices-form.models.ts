import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type PricesType = FormArray<FormGroup<ObjectFormPricesItemVM>>;
export interface ObjectFormPricesItemVM {
  name: FormControl<string>;
  price: FormControl<string>;
  minStay: FormControl<number>;
  discounts: FormGroup<DiscountsFormVM>;
  weekendDiscount: FormGroup<WeekendDiscountFormVM>;
  additionalGuests: FormGroup<AdditionalGuestsFormVM>;
}

export interface DiscountsFormVM {
  durationStay: FormArray<FormGroup<DurationStayDiscountItemFormVM>>;
  lastMinuteBooking: FormArray<FormGroup<LastMinuteBookingDiscountItemFormVM>>;
  earlyBooking: FormArray<FormGroup<EarlyBookingDiscountItemFormVM>>;
}

export interface DurationStayDiscountItemFormVM {
  durationOver: FormControl<number>;
  discount: FormControl<string>;
  unit: FormControl<string>;
}

export interface EarlyBookingDiscountItemFormVM {
  beforeMonths: FormControl<number>;
  discount: FormControl<string>;
  unit: FormControl<string>;
}

export interface LastMinuteBookingDiscountItemFormVM {
  beforeDays: FormControl<number>;
  discount: FormControl<string>;
  unit: FormControl<string>;
}

export interface WeekendDiscountFormVM {
  price: FormControl<string>;
  friday: FormControl<boolean>;
  saturday: FormControl<boolean>;
  sunday: FormControl<boolean>;
}

export interface AdditionalGuestsFormVM {
  overGuests: FormControl<number>;
  surcharge: FormControl<string>;
  unit: FormControl<string>;
}
