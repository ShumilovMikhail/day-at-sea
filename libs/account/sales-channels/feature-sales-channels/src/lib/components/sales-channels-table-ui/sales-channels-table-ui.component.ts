import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelStatusVMType, SalesChannelVM } from '../../types/sales-channels.models';
import { AccordionDirective, IsMobileDirective } from '@utils/directives';

@Component({
  selector: 'account-sales-channels-table-ui',
  standalone: true,
  imports: [CommonModule, IsMobileDirective, AccordionDirective],
  templateUrl: './sales-channels-table-ui.component.html',
  styleUrl: './sales-channels-table-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesChannelsTableUiComponent {
  @Input({ required: true }) salesChannelsList!: SalesChannelVM[];
  @Output() settingsButtonClickEvent = new EventEmitter<SalesChannelVM>();
  @Output() deleteButtonClickEvent = new EventEmitter<number>();
  @Output() changeStatusEvent = new EventEmitter<{
    salesChannel: SalesChannelVM;
    newStatus: ChannelStatusVMType;
  }>();
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  public isMobile = false;

  public onIsMobileChange(isMobile: boolean): void {
    if (this.isMobile !== isMobile) {
      this.isMobile = isMobile;
      this.changeDetectorRef.detectChanges();
    }
  }

  public onSettingsButtonClick(salesChannel: SalesChannelVM): void {
    this.settingsButtonClickEvent.emit(salesChannel);
  }
  public onDeleteButtonClick(id: number): void {
    this.deleteButtonClickEvent.emit(id);
  }
  public onStatusChange(salesChannel: SalesChannelVM, newStatus: ChannelStatusVMType): void {
    this.changeStatusEvent.emit({ salesChannel, newStatus });
  }
}
