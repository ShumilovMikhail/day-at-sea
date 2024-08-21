import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { dateAdapter } from '../utils/date.adapter';

export function departureDateValidator(arrivalDateControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const arrivalDate = dateAdapter.stringToDate(arrivalDateControl.value);
    const departureDate = dateAdapter.stringToDate(control.value);
    return arrivalDate.getTime() < departureDate.getTime() ? null : { departureBeforeArrival: true };
  };
}
