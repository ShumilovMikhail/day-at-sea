import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function isCorrectDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const [day, month, year] = control.value.split('.');
    return day && month && year ? null : { isIncorrectDate: true };
  };
}
