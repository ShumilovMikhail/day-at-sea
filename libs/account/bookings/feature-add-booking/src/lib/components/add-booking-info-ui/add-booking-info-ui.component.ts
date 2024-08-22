import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingInfoForm } from '../../types/add-booking.models';
import { UiFormsCalendarComponent, UiFormsInputComponent, UiFormsSelectComponent } from '@ui/forms';

@Component({
  selector: 'account-add-booking-info-ui',
  standalone: true,
  imports: [CommonModule, UiFormsSelectComponent, UiFormsCalendarComponent, UiFormsInputComponent],
  templateUrl: './add-booking-info-ui.component.html',
  styleUrl: './add-booking-info-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookingInfoUiComponent {
  @Input({ required: true }) info!: BookingInfoForm;
  @Input() myObjectsList: string[] = [];
}
