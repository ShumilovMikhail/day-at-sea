import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionDirective } from '@utils/directives';
import { RouterLink } from '@angular/router';
import { ClientVM } from '../../types/clients.models';

@Component({
  selector: 'account-my-clients-list-ui',
  standalone: true,
  imports: [CommonModule, AccordionDirective, RouterLink, AccordionDirective],
  templateUrl: './my-clients-list-ui.component.html',
  styleUrl: './my-clients-list-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyClientsListUiComponent {
  @Output() vipChangeEvent = new EventEmitter<number>();
  @Output() showBookingHistoryEvent = new EventEmitter<number>();
  @Input({ required: true }) clients!: ClientVM[];
  @Input() isMobile = false;

  public onVipChange(id: number): void {
    this.vipChangeEvent.emit(id);
  }

  public onShowBookingHistory(id: number): void {
    this.showBookingHistoryEvent.emit(id);
  }
}
