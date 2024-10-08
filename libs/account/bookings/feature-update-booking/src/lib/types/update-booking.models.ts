import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface BookingForm extends BookingInfoForm, BookingAmountForm {
  instalments: FormArray<FormGroup<BookingFormInstalment>>;
  note: FormControl<string>;
}

export interface BookingAmountForm {
  dailyPrice: FormControl<number>;
  amount: FormControl<number>;
  pledge: FormControl<number>;
  paid: FormControl<number>;
}

export interface BookingInfoForm {
  agencyObjectTitle: FormControl<string>;
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

export interface InstalmentVM {
  date: string;
  amount: number;
  commentary: string;
}
