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
import { FeatureTableComponent, TableColumnVM } from '@tables/feature-table';

@Component({
  selector: 'account-my-clients-list-ui',
  standalone: true,
  imports: [CommonModule, AccordionDirective, RouterLink, AccordionDirective, FeatureTableComponent],
  templateUrl: './my-clients-list-ui.component.html',
  styleUrl: './my-clients-list-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyClientsListUiComponent implements AfterViewInit {
  @Output() vipChangeEvent = new EventEmitter<number>();
  @Output() showBookingHistoryEvent = new EventEmitter<number>();
  @Input({ required: true }) set tableSettings(tableSettings: TableColumn[]) {
    this.tableSettingsModel = tableSettings;
    if (this.tableSettingsVM) this.changeTableSettings();
  }
  @Input({ required: true }) clients!: ClientVM[];
  @Input() isMobile = false;
  @ViewChild('isVip', { read: TemplateRef, static: false }) isVip!: TemplateRef<HTMLElement> | null;
  @ViewChild('bookingsCount', { read: TemplateRef, static: false }) bookingsCount!: TemplateRef<HTMLElement> | null;
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private tableSettingsModel: TableColumn[] = [];
  public tableSettingsVM: TableColumnVM[] | null = null;

  public onVipChange(id: number): void {
    this.vipChangeEvent.emit(id);
  }

  public onShowBookingHistory(id: number): void {
    this.showBookingHistoryEvent.emit(id);
  }

  private changeTableSettings(): void {
    this.tableSettingsVM = this.tableSettingsModel.map((item) => ({
      ...item,
      projected: item.projected ? (this as any)[item.name]! : null,
    }));
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.changeTableSettings();
  }
}
