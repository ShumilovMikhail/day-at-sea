import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface ObjectForm {
  placement: FormControl<string>;
  address: FormControl<string>;
  infrastructure: FormGroup<ObjectFormInfrastructure>;
  characteristics: FormGroup<ObjectFormCharacteristics>;
  photos: FormGroup<ObjectFormPhotos>;
  rules: FormGroup<ObjectFormRules>;
  services: FormArray<FormControl<string>>;
  prices: FormArray<FormGroup<ObjectPricesItem>>;
}

export interface ObjectFormInfrastructure {
  places: FormArray<FormControl<InfrastructureItem>>;
  leisure: FormArray<FormControl<InfrastructureItem>>;
  leisureWater: FormArray<FormControl<InfrastructureItem>>;
  leisureActive: FormArray<FormControl<InfrastructureItem>>;
  reachByPublicTransport: FormControl<string>;
  reachByPrivateTransport: FormControl<string>;
}

export interface InfrastructureItem {
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
  roomCount: FormControl<string>;
  bedroomCount: FormControl<string>;
  guestCount: FormControl<string>;
  rooms: FormGroup<{
    bedrooms: FormArray<FormGroup<RoomItem>>;
    bathrooms: FormArray<FormGroup<RoomItem>>;
  }>;
  waterSupplyType: FormControl<string>;
  amenities: FormGroup<Amenities>;
  description: FormControl<string>;
}

export interface RoomItem {
  name: FormControl<string>;
  count: FormControl<string>;
}

export interface Amenities {
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

export interface ObjectPricesItem {
  name: FormControl<string>;
  price: FormControl<string>;
  minStay: FormControl<number>;
  discounts: FormGroup<Discounts>;
  weekendDiscount: FormGroup<WeekendDiscount>;
  additionalGuests: FormGroup<AdditionalGuests>;
  onRequest: FormControl<boolean>;
  instant: FormControl<boolean>;
}

export interface Discounts {
  durationStay: FormArray<FormGroup<DurationStayDiscountItem>>;
  lastMinuteBooking: FormArray<FormGroup<LastMinuteBookingDiscountItem>>;
  earlyBooking: FormArray<FormGroup<EarlyBookingDiscountItem>>;
}

export interface DurationStayDiscountItem {
  durationOver: FormControl<number>;
  discount: FormControl<string>;
  unit: FormControl<string>;
}

export interface EarlyBookingDiscountItem {
  beforeMonths: FormControl<number>;
  discount: FormControl<string>;
  unit: FormControl<string>;
}

export interface LastMinuteBookingDiscountItem {
  beforeDays: FormControl<number>;
  discount: FormControl<string>;
  unit: FormControl<string>;
}

export interface WeekendDiscount {
  price: FormControl<string>;
  friday: FormControl<boolean>;
  saturday: FormControl<boolean>;
  sunday: FormControl<boolean>;
}

export interface AdditionalGuests {
  overGuests: FormControl<number>;
  surcharge: FormControl<string>;
  unit: FormControl<string>;
}
