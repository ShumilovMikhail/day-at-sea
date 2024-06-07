import { inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map } from 'rxjs';

import { ApiService } from '@http';

export function loginAvailableValidator(): AsyncValidatorFn {
  const apiService = inject(ApiService);
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return apiService
      .post<{ is_exist: boolean }>('login', { login: control.value })
      .pipe(map(({ is_exist }) => (is_exist ? { isExist: true } : null)));
  };
}
