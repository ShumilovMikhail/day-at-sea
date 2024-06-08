import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function loginCorrectlyValidator(): ValidatorFn {
  const pattern = /^[a-zA-Z0-9-_]+$/;
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value.length === 0) {
      return null;
    }
    return pattern.test(control.value) ? null : { isIncorrectly: true };
  };
}
