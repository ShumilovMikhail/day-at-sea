import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface ObjectForm {
  placement: FormControl<string>;
  address: FormControl<string>;
  infrastructure: FormGroup<ObjectFormInfrastructure>;
  characteristics: FormGroup<ObjectFormCharacteristics>;
  photos: FormGroup<ObjectFormPhotos>;
  rules: FormGroup<ObjectFormRules>;
  services: FormArray<FormControl<string>>;
}

export interface ObjectFormInfrastructure {
  placesDistance: FormArray<FormControl<InfrastructureItem>>;
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
