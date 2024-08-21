import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '@layers';
import { UiFormsCalendarComponent, UiFormsInputComponent } from '@ui/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControlPipe } from '@utils/pipes';
import { BookingFormInstalment, InstalmentVM } from '../../types/add-booking.models';

@Component({
  selector: 'account-add-booking-add-instalment-ui',
  standalone: true,
  imports: [CommonModule, ModalComponent, UiFormsCalendarComponent, UiFormsInputComponent, FormControlPipe],
  templateUrl: './add-booking-add-instalment-ui.component.html',
  styleUrl: './add-booking-add-instalment-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookingAddInstalmentUiComponent {
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
