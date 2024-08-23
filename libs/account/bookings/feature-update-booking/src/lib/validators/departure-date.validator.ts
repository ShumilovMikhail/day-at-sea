import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { stringToDate } from '@utils/functions';

export function departureDateValidator(arrivalDateControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const arrivalDate = stringToDate(arrivalDateControl.value);
    const departureDate = stringToDate(control.value);
    return arrivalDate.getTime() < departureDate.getTime() ? null : { departureBeforeArrival: true };
  };
}
