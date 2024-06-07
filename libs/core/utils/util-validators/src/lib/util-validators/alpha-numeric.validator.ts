import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function alphaNumericValidator(): ValidatorFn {
  const pattern = /^[a-zA-Z0-9]+$/;
  return (control: AbstractControl): ValidationErrors | null => {
    return pattern.test(control.value) ? null : { isIncorrectly: true };
  };
}
