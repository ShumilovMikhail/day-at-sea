import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '@layers';

@Component({
  selector: 'account-my-clients-booking-history-ui',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './my-clients-booking-history-ui.component.html',
  styleUrl: './my-clients-booking-history-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyClientsBookingHistoryUiComponent {}
