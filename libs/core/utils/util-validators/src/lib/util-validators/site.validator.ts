import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

interface SiteValidatorArgs {
  required?: boolean;
}

export function siteValidator(
  siteUrl: string,
  args: SiteValidatorArgs = {
    required: true,
  }
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === '') {
      return args.required ? { site: true } : null;
    }
    return (control.value as string).includes(siteUrl) ? null : { site: true };
  };
}
