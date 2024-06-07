import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function fullNameValidator(): ValidatorFn {
  const pattern =
    /^\s*([a-zA-Zа-яА-ЯёЁ]+)\s+([a-zA-Zа-яА-ЯёЁ]+)\s+([a-zA-Zа-яА-ЯёЁ]+)\s*$/;
  return (control: AbstractControl): ValidationErrors | null => {
    return pattern.test(control.value) ? null : { isIncorrectly: true };
  };
}
