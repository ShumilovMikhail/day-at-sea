import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingVM } from '../../types/bookings.models';
import { AccordionDirective } from '@utils/directives';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'account-my-bookings-list-ui',
  standalone: true,
  imports: [CommonModule, AccordionDirective, RouterLink],
  templateUrl: './my-bookings-list-ui.component.html',
  styleUrl: './my-bookings-list-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBookingsListUiComponent {
  @Input({ required: true }) bookings!: BookingVM[];
  @Input() isMobile = false;
}
