import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingInfoForm } from '../../types/update-booking.models';
import { UiFormsCalendarComponent, UiFormsInputComponent, UiFormsSelectComponent } from '@ui/forms';

@Component({
  selector: 'account-update-booking-info-ui',
  standalone: true,
  imports: [CommonModule, UiFormsSelectComponent, UiFormsCalendarComponent, UiFormsInputComponent],
  templateUrl: './update-booking-info-ui.component.html',
  styleUrl: './update-booking-info-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateBookingInfoUiComponent {
  @Input({ required: true }) info!: BookingInfoForm;
  @Input() myObjectsList: string[] = [];
}
