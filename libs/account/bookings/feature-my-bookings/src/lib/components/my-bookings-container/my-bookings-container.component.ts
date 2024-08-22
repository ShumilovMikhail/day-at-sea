import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyBookingsFiltersUiComponent } from '../my-bookings-filters-ui/my-bookings-filters-ui.component';
import { IsMobileDirective } from '@utils/directives';

@Component({
  selector: 'account-my-bookings-container',
  standalone: true,
  imports: [CommonModule, MyBookingsFiltersUiComponent, IsMobileDirective],
  templateUrl: './my-bookings-container.component.html',
  styleUrl: './my-bookings-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBookingsContainerComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public isMobile = false;

  public onIsMobileChange(isMobile: boolean): void {
    if (this.isMobile !== isMobile) {
      this.isMobile = isMobile;
      this.changeDetectorRef.detectChanges();
    }
  }
}
