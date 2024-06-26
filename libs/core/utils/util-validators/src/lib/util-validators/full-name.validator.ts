import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function fullNameValidator(): ValidatorFn {
  const pattern = /^(?:[а-яА-ЯёЁ]+(?:\s+[а-яА-ЯёЁ]+){2})$/;
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value.length === 0) {
      return null;
    }
    return pattern.test(control.value) ? null : { isIncorrectly: true };
  };
}
