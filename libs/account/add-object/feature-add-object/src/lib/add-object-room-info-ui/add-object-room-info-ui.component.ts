import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UiFormsAddressComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';
import { ObjectInfoVM } from '../types/object.models';

@Component({
  selector: 'account-add-object-room-info-ui',
  standalone: true,
  imports: [CommonModule, UiFormsAddressComponent, FormControlPipe, ReactiveFormsModule],
  templateUrl: './add-object-room-info-ui.component.html',
  styleUrl: './add-object-room-info-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectRoomInfoUiComponent {
  @Input() isLoading = false;
  @Output() submitEvent = new EventEmitter<ObjectInfoVM>();
  private readonly fb = inject(FormBuilder);
  public readonly form = this.fb.group({
    address: ['', [Validators.required]],
    type: ['Комната в квартире', [Validators.required]],
    countRoom: ['1', [Validators.required]],
  });

  public onSubmit(): void {
    this.submitEvent.emit(this.form.value as ObjectInfoVM);
  }
}
