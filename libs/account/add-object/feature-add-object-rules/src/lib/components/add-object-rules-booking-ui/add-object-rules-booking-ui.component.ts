import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BookingVM } from '../../types/rules.models';
import { UiFormsInputComponent, UiFormsSelectComponent } from '@ui/forms';

@Component({
  selector: 'account-add-object-rules-booking-ui',
  standalone: true,
  imports: [CommonModule, UiFormsSelectComponent, UiFormsInputComponent, ReactiveFormsModule],
  templateUrl: './add-object-rules-booking-ui.component.html',
  styleUrl: './add-object-rules-booking-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectRulesBookingUiComponent {
  @Input({ required: true }) booking!: BookingVM;
}
