import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface InfrastructureFormVM {
  places: FormArray<FormGroup<InfrastructureItemFormVM>>;
  leisure: FormArray<FormGroup<InfrastructureItemFormVM>>;
  leisureWater: FormArray<FormGroup<InfrastructureItemFormVM>>;
  leisureActive: FormArray<FormGroup<InfrastructureItemFormVM>>;
  reachByPublicTransport: FormControl<string>;
  reachByPrivateTransport: FormControl<string>;
}

export interface InfrastructureListFormVM {
  places: FormArray<FormControl<InfrastructureItemFormVM>>;
  leisure: FormArray<FormControl<InfrastructureItemFormVM>>;
  leisureWater: FormArray<FormControl<InfrastructureItemFormVM>>;
  leisureActive: FormArray<FormControl<InfrastructureItemFormVM>>;
}

export interface InfrastructureReachesFormVM {
  reachByPublicTransport: FormControl<string>;
  reachByPrivateTransport: FormControl<string>;
}

export interface InfrastructureItemFormVM {
  name: FormControl<string>;
  distance: FormControl<string>;
}
