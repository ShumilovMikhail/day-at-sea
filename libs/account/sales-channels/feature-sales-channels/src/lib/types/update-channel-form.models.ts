import { FormControl } from '@angular/forms';

export interface UpdateChannelForm {
  id: FormControl<number>;
  channel: FormControl<string>;
  title: FormControl<string>;
  accountId: FormControl<string>;
  status: FormControl<string>;
}
