import { FormArray, FormControl } from '@angular/forms';

export interface RulesVM {
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

export interface ArrivalVM {
  arrivalTime: FormControl<string>;
  departureTime: FormControl<string>;
  earlyArrival: FormControl<boolean>;
  lateDeparture: FormControl<boolean>;
}

export interface BookingVM {
  paymentCheckIn: FormControl<string>;
  pledge: FormControl<string>;
  freeCancellation: FormControl<string>;
}
