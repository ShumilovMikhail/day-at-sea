import { Injectable } from '@angular/core';

import { AgencyObject } from '@account/add-object/util';
@Injectable({ providedIn: 'root' })
export class LocalStorageObjectFormService {
  private readonly formKey = 'add-object-form';

  public hasObjectForm(id: number): boolean {
    return Boolean(localStorage.getItem(`${this.formKey}-${id}`));
  }

  public setObjectForm(id: number, form: AgencyObject): void {
    try {
      localStorage.setItem(`${this.formKey}-${id}`, JSON.stringify(form));
    } catch {
      throw Error('object form locale storage set: storage is full');
    }
  }

  public getObjectForm(id: number): AgencyObject | null {
    const JSONForm: string | null = localStorage.getItem(`${this.formKey}-${id}`);
    return JSONForm ? JSON.parse(JSONForm) : null;
  }

  public updateObjectForm(id: number, partForm: Partial<AgencyObject>): void {
    const JSONForm: string | null = localStorage.getItem(`${this.formKey}-${id}`);
    const form = JSONForm ? JSON.parse(JSONForm) : null;
    try {
      localStorage.setItem(`${this.formKey}-${id}`, JSON.stringify({ ...form, ...partForm }));
    } catch {
      throw Error('object form locale storage set: storage is full');
    }
  }

  public removeObjectForm(id: number): void {
    return localStorage.removeItem(`${this.formKey}-${id}`);
  }
}
