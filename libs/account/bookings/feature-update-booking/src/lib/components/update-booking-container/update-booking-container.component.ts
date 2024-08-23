import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account-update-booking-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-booking-container.component.html',
  styleUrl: './update-booking-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateBookingContainerComponent {}
