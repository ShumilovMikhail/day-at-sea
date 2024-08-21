import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingAmountForm } from '../../types/add-booking.models';
import { UiFormsInputComponent } from '@ui/forms';

@Component({
  selector: 'account-add-booking-amount-ui',
  standalone: true,
  imports: [CommonModule, UiFormsInputComponent],
  templateUrl: './add-booking-amount-ui.component.html',
  styleUrl: './add-booking-amount-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookingAmountUiComponent {
  @Input({ required: true }) amount!: BookingAmountForm;
}
