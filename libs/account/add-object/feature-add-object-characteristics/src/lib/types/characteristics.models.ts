import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface CharacteristicsVM {
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
    bedrooms: FormArray<FormGroup<RoomItemVM>>;
    bathrooms: FormArray<FormGroup<RoomItemVM>>;
  }>;
  waterSupplyType: FormControl<string>;
  amenities: FormGroup<AmenitiesVM>;
  description: FormControl<string>;
}

export interface AmenitiesVM {
  flat: FormArray<FormControl<string>>;
  bathroom: FormArray<FormControl<string>>;
  kitchen: FormArray<FormControl<string>>;
  children: FormArray<FormControl<string>>;
}

export interface RoomItemVM {
  name: FormControl<string>;
  count: FormControl<string>;
}
