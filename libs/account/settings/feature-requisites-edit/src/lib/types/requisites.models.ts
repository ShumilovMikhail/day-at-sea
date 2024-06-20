import { FormControl } from '@angular/forms';

export interface RequisitesVM {
  name: string | null;
  phone: string | null;
  city: string | null;
  contactPerson: string | null;
  logo: string | null;
}

export interface RequisitesForm {
  name: FormControl<string | null>;
  city: FormControl<string | null>;
  phone: FormControl<string | null>;
  contactPerson: FormControl<string | null>;
  logo: FormControl<string | null>;
}
