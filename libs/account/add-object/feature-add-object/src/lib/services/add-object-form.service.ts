import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AgencyObject, createObjectForm, ObjectForm } from '@account/add-object/util';
import { LocalStorageObjectFormService } from '@account/add-object/data-access';

@Injectable({
  providedIn: 'root',
})
export class AddObjectFormService {
  private readonly localStorageObjectFormService = inject(LocalStorageObjectFormService);
  public readonly form: FormGroup<ObjectForm>;

  constructor() {
    const savedForm: AgencyObject | null = this.localStorageObjectFormService.getObjectForm();
    this.form = createObjectForm(savedForm);
    if (!savedForm) {
      this.localStorageObjectFormService.setObjectForm(this.form.value as AgencyObject);
    }
  }
}
