import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface CharacteristicsFormVM {
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
  rooms: FormGroup<ObjectRoomsFormVM>;
  waterSupplyType: FormControl<string>;
  amenities: FormGroup<AmenitiesFormVM>;
  description: FormControl<string>;
}

export interface GeneralParameterFormVM {
  placementType: FormControl<string>;
  square: FormControl<string>;
  floor: FormControl<string>;
  floorCount: FormControl<string>;
  lift: FormControl<boolean>;
  attic: FormControl<boolean>;
  kitchen: FormControl<string>;
  repair: FormControl<string>;
}

export interface RoomsFormVM {
  roomCount: FormControl<number>;
  bedroomCount: FormControl<string>;
  guestCount: FormControl<number | string>;
  rooms: FormGroup<ObjectRoomsFormVM>;
  waterSupplyType: FormControl<string>;
}

export interface ObjectRoomsFormVM {
  bedrooms: FormArray<FormGroup<RoomItemFormVM>>;
  bathrooms: FormArray<FormGroup<RoomItemFormVM>>;
}

export interface RoomItemFormVM {
  name: FormControl<string>;
  count: FormControl<number>;
}

export interface AmenitiesFormVM {
  flat: FormArray<FormControl<string>>;
  bathroom: FormArray<FormControl<string>>;
  kitchen: FormArray<FormControl<string>>;
  children: FormArray<FormControl<string>>;
}
