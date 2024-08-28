import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '@layers';
import { BookingHistoryItemVM } from '../../types/clients.models';
import { AccordionDirective } from '@utils/directives';

@Component({
  selector: 'account-my-clients-booking-history-ui',
  standalone: true,
  imports: [CommonModule, ModalComponent, AccordionDirective],
  templateUrl: './my-clients-booking-history-ui.component.html',
  styleUrl: './my-clients-booking-history-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyClientsBookingHistoryUiComponent {
  @Output() closeEvent = new EventEmitter<void>();
  @Input({ required: true }) bookingHistory!: BookingHistoryItemVM[];
  @Input() isMobile = false;

  public onClose(): void {
    this.closeEvent.emit();
  }
}
