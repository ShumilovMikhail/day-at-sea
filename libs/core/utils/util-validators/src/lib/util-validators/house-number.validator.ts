import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function houseNumberValidator(): ValidatorFn {
  const pattern = /^\d{1,3}(?:[АБВГДЕ]|\d{0,3}\/\d{1,3})?$/;
  return (control: AbstractControl): ValidationErrors | null => {
    return pattern.test(control.value) ? null : { houseNumber: true };
  };
}
