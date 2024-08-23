import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingAmountForm } from '../../types/update-booking.models';
import { UiFormsInputComponent } from '@ui/forms';

@Component({
  selector: 'account-update-booking-amount-ui',
  standalone: true,
  imports: [CommonModule, UiFormsInputComponent],
  templateUrl: './update-booking-amount-ui.component.html',
  styleUrl: './update-booking-amount-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateBookingAmountUiComponent {
  @Input({ required: true }) amount!: BookingAmountForm;
}
