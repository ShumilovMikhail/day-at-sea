import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
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
export class MyClientsListUiComponent implements AfterViewInit {
  @Output() vipChangeEvent = new EventEmitter<number>();
  @Output() showBookingHistoryEvent = new EventEmitter<number>();
  @Input({ required: true }) tableSettings!: TableColumn[];
  @Input({ required: true }) clients!: ClientVM[];
  @Input() isMobile = false;
  @ViewChild('isVip', { read: TemplateRef, static: false }) isVip!: TemplateRef<HTMLElement> | null;
  @ViewChild('bookingsCount', { read: TemplateRef, static: false }) bookingsCount!: TemplateRef<HTMLElement> | null;
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  public onVipChange(id: number): void {
    this.vipChangeEvent.emit(id);
  }

  public onShowBookingHistory(id: number): void {
    this.showBookingHistoryEvent.emit(id);
  }

  ngAfterViewInit(): void {
    console.log(1);
    this.changeDetectorRef.detectChanges();
  }
}
