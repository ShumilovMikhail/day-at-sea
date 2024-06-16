import { FormArray, FormControl } from '@angular/forms';

export interface ContactsVM {
  phones: string[];
  site: string;
  vk: string;
  ok: string;
  whatsapp: string;
  telegram: string;
  viber: string;
}

export interface ContactsForm {
  phones: FormArray<FormControl<string | null>>;
  site: FormControl<string | null>;
  vk: FormControl<string | null>;
  ok: FormControl<string | null>;
  whatsapp: FormControl<string | null>;
  telegram: FormControl<string | null>;
  viber: FormControl<string | null>;
}
