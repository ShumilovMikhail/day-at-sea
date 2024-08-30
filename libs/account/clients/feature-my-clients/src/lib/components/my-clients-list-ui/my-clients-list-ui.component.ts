import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AccordionDirective } from '@utils/directives';
import { ClientVM } from '../../types/clients.models';
import { TableColumn } from '@tables/feature-settings-table-view';

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
  @Input({ required: true }) tableSettings!: TableColumn[];
  @Input({ required: true }) clients!: ClientVM[];
  @Input() isMobile = false;
  @ViewChild('isVip', { read: TemplateRef }) isVip!: TemplateRef<HTMLElement> | null;
  @ViewChild('bookingsCount', { read: TemplateRef }) bookingsCount!: TemplateRef<HTMLElement> | null;

  public onVipChange(id: number): void {
    this.vipChangeEvent.emit(id);
  }

  public onShowBookingHistory(id: number): void {
    this.showBookingHistoryEvent.emit(id);
  }
}
