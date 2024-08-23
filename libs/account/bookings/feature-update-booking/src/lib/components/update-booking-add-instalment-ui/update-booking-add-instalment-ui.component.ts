import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalComponent } from '@layers';
import { UiFormsCalendarComponent, UiFormsInputComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';
import { BookingFormInstalment } from '../../types/update-booking.models';

@Component({
  selector: 'account-update-booking-add-instalment-ui',
  standalone: true,
  imports: [CommonModule, ModalComponent, UiFormsCalendarComponent, UiFormsInputComponent, FormControlPipe],
  templateUrl: './update-booking-add-instalment-ui.component.html',
  styleUrl: './update-booking-add-instalment-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateBookingAddInstalmentUiComponent {
  @Output() submitEvent = new EventEmitter<FormGroup<BookingFormInstalment>>();
  @Output() closeEvent = new EventEmitter<void>();
  private readonly fb = inject(FormBuilder);
  public readonly form: FormGroup<BookingFormInstalment> = this.fb.nonNullable.group({
    date: ['', [Validators.required]],
    amount: [0, [Validators.required, Validators.min(1)]],
    commentary: [''],
  });

  public onSubmit(): void {
    if (this.form.invalid) {
      throw Error('add instalment: form invalid');
    }
    this.submitEvent.emit(this.form);
  }

  public onClose(): void {
    this.closeEvent.emit();
  }
}
