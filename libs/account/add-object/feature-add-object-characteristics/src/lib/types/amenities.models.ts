import { FormArray, FormControl } from '@angular/forms';

export interface AmenitiesVM {
  flat: FormArray<FormControl<string>>;
  bathroom: FormArray<FormControl<string>>;
  kitchen: FormArray<FormControl<string>>;
  children: FormArray<FormControl<string>>;
}
