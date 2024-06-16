import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { ContactsForm } from '../types/contacts.models';
import { UiFormsInputComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-contacts-edit-ui',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiFormsInputComponent,
    FormControlPipe,
  ],
  templateUrl: './contacts-edit-ui.component.html',
  styleUrl: './contacts-edit-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsEditUiComponent {
  @Input({ required: true }) form!: FormGroup<ContactsForm>;

  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }

  onAddPhoneButtonClick() {
    this.form.controls.phones.push(new FormControl(''));
  }

  onDeletePhoneButtonClick(index: number) {
    this.form.controls.phones.removeAt(index);
  }
}
