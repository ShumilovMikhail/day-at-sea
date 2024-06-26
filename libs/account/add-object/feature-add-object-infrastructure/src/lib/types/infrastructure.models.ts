import { FormArray, FormControl } from '@angular/forms';

export interface InfrastructureVM {
  placesDistance: FormArray<FormControl<InfrastructureItemVM>>;
  leisure: FormArray<FormControl<InfrastructureItemVM>>;
  leisureWater: FormArray<FormControl<InfrastructureItemVM>>;
  leisureActive: FormArray<FormControl<InfrastructureItemVM>>;
  reachByPublicTransport: FormControl<string>;
  reachByPrivateTransport: FormControl<string>;
}

export interface InfrastructureItemVM {
  name: FormControl<string>;
  distance: FormControl<string>;
}
