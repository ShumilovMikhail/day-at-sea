import { FormControl } from '@angular/forms';

export interface AddChannelForm {
  channel: FormControl<string>;
  title: FormControl<string>;
  accountId: FormControl<string>;
}
