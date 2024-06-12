import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstName',
  standalone: true,
})
export class FirstNamePipe implements PipeTransform {
  transform(fullName: string): string {
    const firstName = fullName.split(' ')[1];
    if (!firstName) {
      throw Error('fullName not exist first name');
    }
    return firstName ? firstName : '';
  }
}
