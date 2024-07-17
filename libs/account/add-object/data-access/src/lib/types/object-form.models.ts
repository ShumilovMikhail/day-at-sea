import { FormGroup } from '@angular/forms';

import { ObjectForm } from '@account/add-object/util';

export interface ObjectFormState {
  form: FormGroup<ObjectForm> | null;
  isNewForm: boolean | null;
  isLoading: boolean;
  isSaving: boolean;
}
