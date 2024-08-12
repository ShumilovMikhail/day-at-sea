import { FormControl } from '@angular/forms';

export interface AddStaffMemberForm {
  email: FormControl<string>;
  name: FormControl<string>;
  role: FormControl<string>;
}

export interface AddStaffMember {
  email: string;
  name: string;
  role: string;
}
