import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function conformPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.parent?.get('password')?.value;
    const conformPassword = control.value;
    return password === conformPassword ? null : { conformPassword: true };
  };
}
