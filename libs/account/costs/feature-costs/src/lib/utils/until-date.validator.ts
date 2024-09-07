import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { stringToDate } from '@utils/functions';

export function untilDateValidator(fromDateControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (fromDateControl.value === '' || control.value === '') return null;
    const fromDate = stringToDate(fromDateControl.value);
    const untilDate = stringToDate(control.value);
    return fromDate.getTime() < untilDate.getTime() ? null : { UntilBeforeFrom: true };
  };
}
