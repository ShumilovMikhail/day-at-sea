import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface BookingForm {
  agencyObjectId: FormControl<number | null>;
  arrival: FormControl<string>;
  departure: FormControl<string>;
  guestCount: FormControl<number>;
  dailyPrice: FormControl<number>;
  amount: FormControl<number>;
  note: FormControl<string>;
  source: FormControl<string>;
  status: FormControl<string>;
  pledge: FormControl<number>;
  paid: FormControl<number>;
  instalments: FormArray<FormGroup<BookingFormInstalment>>;
}

export interface BookingFormInstalment {
  date: FormControl<string>;
  amount: FormControl<number>;
  commentary: FormControl<string>;
}
