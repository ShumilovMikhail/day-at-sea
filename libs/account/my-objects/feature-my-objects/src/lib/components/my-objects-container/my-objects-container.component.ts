import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';

import { MyObjectsTableList } from '../../types/my-objects-vm.models';
import { MyObjectsTableUiComponent } from '../my-objects-table-ui/my-objects-table-ui.component';
import { IsMobileDirective } from '@utils/directives';
import { MyObjectsListMobileUiComponent } from '../my-objects-list-mobile-ui/my-objects-list-mobile-ui.component';
import { MyObjectsFiltersUiComponent } from '../my-objects-filters-ui/my-objects-filters-ui.component';
import { AgencyFacade } from '@account/data-access-agency';
import { MyObjectsStore } from './my-objects-container.store';
import { MyObjectsFilters } from '../../types/my-objects-state';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';

@Component({
  selector: 'account-my-objects-container',
  standalone: true,
  imports: [
    CommonModule,
    MyObjectsTableUiComponent,
    IsMobileDirective,
    MyObjectsListMobileUiComponent,
    MyObjectsFiltersUiComponent,
    UiIndicatorsLoaderComponent,
  ],
  providers: [MyObjectsStore],
  templateUrl: './my-objects-container.component.html',
  styleUrl: './my-objects-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyObjectsContainerComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly agencyFacade = inject(AgencyFacade);
  private readonly myObjectsStore = inject(MyObjectsStore);
  public readonly salesChannels$: Observable<string[] | null> = this.agencyFacade.salesChannels$.pipe(
    map((salesChannels) => salesChannels?.map((salesChannel) => salesChannel.title) ?? null)
  );
  public readonly myObjectWithFilters$: Observable<MyObjectsTableList | null> =
    this.myObjectsStore.myObjectsWithFilters;
  public isMobile = false;

  constructor(title: Title) {
    title.setTitle('Мои объекты');
  }

  public onIsMobileChange(isMobile: boolean): void {
    if (this.isMobile !== isMobile) {
      this.isMobile = isMobile;
      this.changeDetectorRef.detectChanges();
    }
  }

  public onChangeFilters(filters: MyObjectsFilters): void {
    this.myObjectsStore.setFilters(filters);
  }
}
