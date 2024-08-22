import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account-my-bookings-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings-container.component.html',
  styleUrl: './my-bookings-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBookingsContainerComponent {}
