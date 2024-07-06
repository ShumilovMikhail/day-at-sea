import { inject, Injectable } from '@angular/core';

import { AgencyObject } from '@account/add-object/util';
import { AuthFacade } from '@auth/data-access';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class LocalStorageObjectFormService {
  private readonly authFacade = inject(AuthFacade);
  private formKey: string | null = null;

  constructor() {
    this.authFacade.token$
      .pipe(
        takeUntilDestroyed(),
        filter((token: string | null): token is string => Boolean(token))
      )
      .subscribe((token: string) => {
        this.formKey = `add-object-form-${token}`;
      });
  }

  public setObjectForm(form: AgencyObject): void {
    if (this.formKey) {
      console.log(form.photos);
      localStorage.setItem(this.formKey, JSON.stringify(form));
      return;
    }
    throw Error('object form locale storage set: token in null');
  }

  public getObjectForm(): AgencyObject | null {
    if (this.formKey) {
      const JSONForm: string | null = localStorage.getItem(this.formKey);
      return JSONForm ? JSON.parse(JSONForm) : null;
    }
    return null;
  }

  public updateObjectForm(partForm: Partial<AgencyObject>): void {
    if (!this.formKey) {
      throw Error('object form locale storage update: token in null');
    }
    const JSONForm: string | null = localStorage.getItem(this.formKey);
    if (JSONForm) {
      const form = JSON.parse(JSONForm);
      console.log({ ...form, ...partForm });
      localStorage.setItem(this.formKey, JSON.stringify({ ...form, ...partForm }));
    }
  }

  public removeObjectForm(): void {
    if (this.formKey) {
      return localStorage.removeItem(this.formKey);
    }
    throw Error('object form locale storage remove: token in null');
  }
}
