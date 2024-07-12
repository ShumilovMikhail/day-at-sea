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

import { SalesChannelsVM } from '../../types/sales-channels.models';
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
  @Input({ required: true }) salesChannelsList!: SalesChannelsVM[];
  @Output() settingsButtonClickEvent = new EventEmitter<void>();
  @Output() deleteButtonClickEvent = new EventEmitter<void>();
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  public isMobile = false;

  public onIsMobileChange(isMobile: boolean): void {
    if (this.isMobile !== isMobile) {
      this.isMobile = isMobile;
      this.changeDetectorRef.detectChanges();
    }
  }

  public onSettingsButtonClick(): void {
    this.settingsButtonClickEvent.emit();
  }
  public onDeleteButtonClick(): void {
    this.deleteButtonClickEvent.emit();
  }
}
