import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function containsSpacesValidator(): ValidatorFn {
  const pattern = /\s/;
  return (control: AbstractControl): ValidationErrors | null => {
    return pattern.test(control.value) ? { containsSpaces: true } : null;
  };
}
