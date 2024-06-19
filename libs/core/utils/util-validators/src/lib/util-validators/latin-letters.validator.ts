import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function latinLettersValidator(): ValidatorFn {
  const pattern = /^(?!.*[а-яА-ЯёЁ]).*$/;
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value.length === 0) {
      return null;
    }
    return pattern.test(control.value) ? null : { latinLetters: true };
  };
}
