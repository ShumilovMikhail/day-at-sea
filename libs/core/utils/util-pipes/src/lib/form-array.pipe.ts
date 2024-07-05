import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';

@Pipe({
  name: 'formArray',
  standalone: true,
})
export class FormArrayPipe implements PipeTransform {
  transform(abstractControl: AbstractControl): FormArray {
    return abstractControl as FormArray;
  }
}
