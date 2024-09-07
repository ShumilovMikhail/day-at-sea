import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, take } from 'rxjs';

import { CostsFiltersUiComponent } from '../costs-filters-ui/costs-filters-ui.component';
import { IsMobileDirective } from '@utils/directives';
import { UiCommonWriteExcelComponent } from '@ui/common';
import { CostsListUiComponent } from '../costs-list-ui/costs-list-ui.component';
import { FilesService } from '@utils/files';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';
import { CostsFilters } from '../../types/filters.models';
import { CostsService } from '../../services/costs.service';
import { CostVM } from '../../types/costs.models';
import { costEntityAdapter } from '../../utils/booking-entity.adapter';
import { CostsFacade } from '@account/costs/data-access';

@Component({
  selector: 'account-my-bookings-container',
  standalone: true,
  imports: [
    CommonModule,
    CostsFiltersUiComponent,
    IsMobileDirective,
    UiCommonWriteExcelComponent,
    CostsListUiComponent,
    UiIndicatorsLoaderComponent,
  ],
  providers: [CostsService],
  templateUrl: './costs-container.component.html',
  styleUrl: './costs-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostsContainerComponent {
  private readonly costsFacade = inject(CostsFacade);
  private readonly filesService = inject(FilesService);
  private readonly costsService = inject(CostsService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public readonly costs$: Observable<CostVM[]> = this.costsService.costsWithFilters$;
  public isMobile = false;

  public onIsMobileChange(isMobile: boolean): void {
    if (this.isMobile !== isMobile) {
      this.isMobile = isMobile;
      this.changeDetectorRef.detectChanges();
    }
  }

  public onChangeFilters(filters: CostsFilters): void {
    this.costsService.setFilters(filters);
  }

  public onDeleteCost(id: number): void {
    this.costsFacade.deleteCost(id);
  }

  onExportXLSX(): void {
    this.costs$.pipe(take(1)).subscribe((tableList: CostVM[]) => {
      const tableExcelData = costEntityAdapter.vmToXLSXFileData(tableList);
      this.filesService.createFile(tableExcelData, 'xlsx', {
        name: 'Мои расходы',
        sheetName: 'Мои расходы',
      });
    });
  }
}
