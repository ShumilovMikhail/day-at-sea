import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ContactsForm } from '../types/contacts.models';
import { UiFormsInputComponent, UiFormsPhoneComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-contacts-edit-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiFormsInputComponent, FormControlPipe, UiFormsPhoneComponent],
  templateUrl: './contacts-edit-ui.component.html',
  styleUrl: './contacts-edit-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsEditUiComponent {
  public readonly form = input<FormGroup<ContactsForm>>();
  public readonly isLoading = input<boolean>(false);
  public readonly submitEvent = output<void>();
  public readonly cancelEvent = output<void>();
  public readonly addPhoneEvent = output<void>();
  public readonly deletePhone = output<number>();

  get phones(): FormArray {
    return this.form()?.get('phones') as FormArray;
  }

  public onAddPhoneButtonClick(): void {
    this.addPhoneEvent.emit();
  }

  public onDeletePhoneButtonClick(index: number): void {
    this.deletePhone.emit(index);
  }

  public onSubmit(): void {
    this.submitEvent.emit();
  }

  public onCancel(): void {
    this.cancelEvent.emit();
  }
}
