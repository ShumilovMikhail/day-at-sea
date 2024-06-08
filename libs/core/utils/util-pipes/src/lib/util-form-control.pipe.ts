import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
  name: 'utilFormControl',
  standalone: true,
})
export class UtilFormControlPipe implements PipeTransform {
  transform(abstractControl: AbstractControl): FormControl {
    return abstractControl as FormControl;
  }
}
