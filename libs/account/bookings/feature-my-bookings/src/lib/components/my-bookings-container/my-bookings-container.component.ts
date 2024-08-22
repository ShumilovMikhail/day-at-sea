import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, take } from 'rxjs';

import { MyBookingsFiltersUiComponent } from '../my-bookings-filters-ui/my-bookings-filters-ui.component';
import { IsMobileDirective } from '@utils/directives';
import { UiCommonWriteExcelComponent } from '@ui/common';
import { MyBookingsService } from '../../services/my-bookings.service';
import { MyBookingsListUiComponent } from '../my-bookings-list-ui/my-bookings-list-ui.component';
import { BookingVM } from '../../types/bookings.models';
import { MyBookingsFilters } from '../../types/filters.models';
import { FilesService } from '@utils/files';
import { bookingEntityAdapter } from '../../utils/booking-entity.adapter';

@Component({
  selector: 'account-my-bookings-container',
  standalone: true,
  imports: [
    CommonModule,
    MyBookingsFiltersUiComponent,
    IsMobileDirective,
    UiCommonWriteExcelComponent,
    MyBookingsListUiComponent,
  ],
  providers: [MyBookingsService],
  templateUrl: './my-bookings-container.component.html',
  styleUrl: './my-bookings-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBookingsContainerComponent {
  private readonly filesService = inject(FilesService);
  private readonly myBookingsService = inject(MyBookingsService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public readonly bookings$: Observable<BookingVM[]> = this.myBookingsService.bookingsWithFilters$;
  public isMobile = false;

  public onIsMobileChange(isMobile: boolean): void {
    if (this.isMobile !== isMobile) {
      this.isMobile = isMobile;
      this.changeDetectorRef.detectChanges();
    }
  }

  public onChangeFilters(filters: MyBookingsFilters): void {
    this.myBookingsService.setFilters(filters);
  }

  onExportXLSX(): void {
    this.bookings$.pipe(take(1)).subscribe((tableList: BookingVM[]) => {
      const tableExcelData = bookingEntityAdapter.vmToXLSXFileData(tableList);
      this.filesService.createFile(tableExcelData, 'xlsx', {
        name: 'Мои брони',
        sheetName: 'Мои брони',
      });
    });
  }
}
