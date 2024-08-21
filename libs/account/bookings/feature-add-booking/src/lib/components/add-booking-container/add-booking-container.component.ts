import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingForm, BookingFormInstalment } from '../../types/add-booking.models';

@Component({
  selector: 'account-add-booking-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-booking-container.component.html',
  styleUrl: './add-booking-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookingContainerComponent {
  private readonly fb = inject(FormBuilder);
  public readonly form: FormGroup<BookingForm> = this.fb.nonNullable.group({
    agencyObjectId: [null as number | null, [Validators.required]],
    arrival: ['', [Validators.required]],
    departure: ['', [Validators.required]],
    guestCount: [0, [Validators.required, Validators.min(1)]],
    dailyPrice: [0, [Validators.required, Validators.min(1)]],
    amount: [0, [Validators.required, Validators.min(1)]],
    pledge: [0, [Validators.required, Validators.min(1)]],
    paid: [0, [Validators.required, Validators.min(1)]],
    note: [''],
    source: [''],
    status: ['', [Validators.required]],
    instalments: this.fb.array([] as FormGroup<BookingFormInstalment>[]),
  });
}
