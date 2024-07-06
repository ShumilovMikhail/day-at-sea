import { FormArray, FormControl } from '@angular/forms';

export interface AmenitiesFormVM {
  flat: FormArray<FormControl<string>>;
  bathroom: FormArray<FormControl<string>>;
  kitchen: FormArray<FormControl<string>>;
  children: FormArray<FormControl<string>>;
}
