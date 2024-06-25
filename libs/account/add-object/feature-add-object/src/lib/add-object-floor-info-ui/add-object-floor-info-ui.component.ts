import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { UiFormsAddressComponent, UiFormsInputComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';
import { houseNumberValidator } from '@utils/validators';
import { ObjectInfoVM } from '../types/object.models';

@Component({
  selector: 'account-add-object-floor-info-ui',
  standalone: true,
  imports: [CommonModule, UiFormsAddressComponent, FormControlPipe, UiFormsInputComponent, ReactiveFormsModule],
  templateUrl: './add-object-floor-info-ui.component.html',
  styleUrl: './add-object-floor-info-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectFloorInfoUiComponent {
  @Input() isLoading = false;
  @Output() submitEvent = new EventEmitter<ObjectInfoVM>();
  private readonly fb = inject(FormBuilder);
  public form = this.fb.group({
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
    house: ['', [Validators.required, houseNumberValidator()]],
    corpus: [''],
    floor: ['', [Validators.required]],
  });

  public onSubmit(): void {
    const formValue = this.form.value;
    const address = `${formValue.city}, ${formValue.street}, ${formValue.house}, ${
      formValue.corpus ? formValue.corpus + ', ' : ''
    } ${formValue.floor}`;
    this.submitEvent.emit({
      address,
    });
  }
}
