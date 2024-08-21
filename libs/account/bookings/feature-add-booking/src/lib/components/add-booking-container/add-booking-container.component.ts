import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account-add-booking-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-booking-container.component.html',
  styleUrl: './add-booking-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookingContainerComponent {}
