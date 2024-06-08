import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
  name: 'formControl',
  standalone: true,
})
export class FormControlPipe implements PipeTransform {
  transform(abstractControl: AbstractControl): FormControl {
    return abstractControl as FormControl;
  }
}
