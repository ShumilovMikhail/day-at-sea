import { FormArray, FormControl } from '@angular/forms';

export interface ObjectFormRulesVM {
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

export interface ArrivalFormVM {
  arrivalTime: FormControl<string>;
  departureTime: FormControl<string>;
  earlyArrival: FormControl<boolean>;
  lateDeparture: FormControl<boolean>;
}

export interface BookingFormVM {
  paymentCheckIn: FormControl<string>;
  pledge: FormControl<string>;
  freeCancellation: FormControl<string>;
}
