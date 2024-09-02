import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { BookingClientForm } from '../../types/add-booking.models';
import { UiFormsInputComponent, UiFormsPhoneComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'account-add-booking-client-ui',
  standalone: true,
  imports: [CommonModule, UiFormsInputComponent, FormControlPipe, UiFormsPhoneComponent],
  templateUrl: './add-booking-client-ui.component.html',
  styleUrl: './add-booking-client-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookingClientUiComponent {
  @Input({ required: true }) client!: FormGroup<BookingClientForm>;
  @Input() selectedClient = false;
}
