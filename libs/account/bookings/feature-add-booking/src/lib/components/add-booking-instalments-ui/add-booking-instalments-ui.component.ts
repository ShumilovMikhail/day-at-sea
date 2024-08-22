import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstalmentVM } from '../../types/add-booking.models';
import { IsMobileDirective } from '@utils/directives';

@Component({
  selector: 'account-add-booking-instalments-ui',
  standalone: true,
  imports: [CommonModule, IsMobileDirective],
  templateUrl: './add-booking-instalments-ui.component.html',
  styleUrl: './add-booking-instalments-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookingInstalmentsUiComponent {
  @Output() addInstalmentEvent = new EventEmitter<void>();
  @Output() deleteInstalmentEvent = new EventEmitter<number>();
  @Input({ required: true }) instalments!: InstalmentVM[];
  public isMobile = false;

  public onAddInstalmentClick(): void {
    this.addInstalmentEvent.emit();
  }

  public onDeleteInstalmentClick(index: number): void {
    this.deleteInstalmentEvent.emit(index);
  }

  public onIsMobileChange(isMobile: boolean): void {
    this.isMobile = isMobile;
  }
}
