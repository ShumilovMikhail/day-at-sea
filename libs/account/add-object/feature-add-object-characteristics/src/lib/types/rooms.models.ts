import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface RoomsVM {
  roomCount: FormControl<string>;
  bedroomCount: FormControl<string>;
  guestCount: FormControl<string>;
  rooms: FormGroup<{
    bedrooms: FormArray<FormGroup<RoomItemVM>>;
    bathrooms: FormArray<FormGroup<RoomItemVM>>;
  }>;
  waterSupplyType: FormControl<string>;
}

export interface RoomItemVM {
  name: FormControl<string>;
  count: FormControl<string>;
}
