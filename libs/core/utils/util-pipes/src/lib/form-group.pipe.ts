import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'formGroup',
  standalone: true,
})
export class FormGroupPipe implements PipeTransform {
  transform(abstractControl: AbstractControl): FormGroup {
    return abstractControl as FormGroup;
  }
}
