import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface ObjectForm {
  placement: FormControl<string>;
  address: FormControl<string>;
  infrastructure: FormGroup<ObjectFormInfrastructure>;
  characteristics: FormGroup<ObjectFormCharacteristics>;
  photos: FormGroup<ObjectFormPhotos>;
  rules: FormGroup<ObjectFormRules>;
  services: FormArray<FormControl<string>>;
  prices: FormArray<FormGroup<ObjectFormPricesItem>>;
}

export interface ObjectFormInfrastructure {
  places: FormArray<FormGroup<InfrastructureItemForm>>;
  leisure: FormArray<FormGroup<InfrastructureItemForm>>;
  leisureWater: FormArray<FormGroup<InfrastructureItemForm>>;
  leisureActive: FormArray<FormGroup<InfrastructureItemForm>>;
  reachByPublicTransport: FormControl<string>;
  reachByPrivateTransport: FormControl<string>;
}

export interface InfrastructureItemForm {
  name: FormControl<string>;
  distance: FormControl<string>;
}

export interface ObjectFormCharacteristics {
  placementType: FormControl<string>;
  square: FormControl<string>;
  floor: FormControl<string>;
  floorCount: FormControl<string>;
  lift: FormControl<boolean>;
  attic: FormControl<boolean>;
  kitchen: FormControl<string>;
  repair: FormControl<string>;
  roomCount: FormControl<number>;
  bedroomCount: FormControl<string>;
  guestCount: FormControl<number | string>;
  rooms: FormGroup<ObjectFormRooms>;
  waterSupplyType: FormControl<string>;
  amenities: FormGroup<AmenitiesForm>;
  description: FormControl<string>;
}

export interface ObjectFormRooms {
  bedrooms: FormArray<FormGroup<RoomItemForm>>;
  bathrooms: FormArray<FormGroup<RoomItemForm>>;
}

export interface RoomItemForm {
  name: FormControl<string>;
  count: FormControl<number>;
}

export interface AmenitiesForm {
  flat: FormArray<FormControl<string>>;
  bathroom: FormArray<FormControl<string>>;
  kitchen: FormArray<FormControl<string>>;
  children: FormArray<FormControl<string>>;
}

export interface ObjectFormRules {
  arrivalTime: FormControl<string>;
  departureTime: FormControl<string>;
  earlyArrival: FormControl<boolean>;
  lateDeparture: FormControl<boolean>;
  rules: FormArray<FormControl<string>>;
  paymentCheckIn: FormControl<string>;
  pledge: FormControl<string>;
  freeCancellation: FormControl<string>;
  description: FormControl<string>;
}

export interface ObjectFormPhotos {
  generalPhotoIndex: FormControl<number | null>;
  photos: FormArray<FormControl<string>>;
}

export interface ObjectFormPricesItem {
  name: FormControl<string>;
  price: FormControl<string>;
  minStay: FormControl<number>;
  discounts: FormGroup<DiscountsForm>;
  weekendDiscount: FormGroup<WeekendDiscountForm>;
  additionalGuests: FormGroup<AdditionalGuestsForm>;
  onRequest: FormControl<boolean>;
  instant: FormControl<boolean>;
}

export interface DiscountsForm {
  durationStay: FormArray<FormGroup<DurationStayDiscountItemForm>>;
  lastMinuteBooking: FormArray<FormGroup<LastMinuteBookingDiscountItemForm>>;
  earlyBooking: FormArray<FormGroup<EarlyBookingDiscountItemForm>>;
}

export interface DurationStayDiscountItemForm {
  durationOver: FormControl<number>;
  discount: FormControl<string>;
  unit: FormControl<string>;
}

export interface EarlyBookingDiscountItemForm {
  beforeMonths: FormControl<number>;
  discount: FormControl<string>;
  unit: FormControl<string>;
}

export interface LastMinuteBookingDiscountItemForm {
  beforeDays: FormControl<number>;
  discount: FormControl<string>;
  unit: FormControl<string>;
}

export interface WeekendDiscountForm {
  price: FormControl<string>;
  friday: FormControl<boolean>;
  saturday: FormControl<boolean>;
  sunday: FormControl<boolean>;
}

export interface AdditionalGuestsForm {
  overGuests: FormControl<number>;
  surcharge: FormControl<string>;
  unit: FormControl<string>;
}
