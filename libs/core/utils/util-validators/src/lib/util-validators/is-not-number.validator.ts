import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function isNotNumberValidator(): ValidatorFn {
  const pattern = /^\d+$/;
  return (control: AbstractControl): ValidationErrors | null => {
    return pattern.test(control.value) ? null : { isNotNumber: true };
  };
}
