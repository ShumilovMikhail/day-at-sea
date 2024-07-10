import { ObjectForm } from '@account/add-object/util';
import { FormGroup } from '@angular/forms';

export interface ObjectFormState {
  form: FormGroup<ObjectForm> | null;
  isNewForm: boolean | null;
  isLoading: boolean;
}
