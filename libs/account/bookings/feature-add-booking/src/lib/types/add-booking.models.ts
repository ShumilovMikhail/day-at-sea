import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface BookingForm extends BookingInfoForm {
  dailyPrice: FormControl<number>;
  amount: FormControl<number>;
  note: FormControl<string>;
  pledge: FormControl<number>;
  paid: FormControl<number>;
  instalments: FormArray<FormGroup<BookingFormInstalment>>;
  client: FormGroup<BookingClientForm>;
}

export interface BookingInfoForm {
  agencyObjectId: FormControl<number | null>;
  arrival: FormControl<string>;
  departure: FormControl<string>;
  guestCount: FormControl<number>;
  status: FormControl<string>;
  source: FormControl<string>;
}

export interface BookingClientForm {
  fullName: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
}

export interface BookingFormInstalment {
  date: FormControl<string>;
  amount: FormControl<number>;
  commentary: FormControl<string>;
}
