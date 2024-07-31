import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function salesChannelTitleValidator(salesChannelsTitleList: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return salesChannelsTitleList.includes(control.value.trim()) ? { salesChannelTitle: true } : null;
  };
}
