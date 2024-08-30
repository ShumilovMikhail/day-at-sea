import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable, take } from 'rxjs';
import { LetDirective } from '@ngrx/component';

import { MyClientsFiltersUiComponent } from '../my-clients-filters-ui/my-clients-filters-ui.component';
import { IsMobileDirective } from '@utils/directives';
import { UiCommonWriteExcelComponent } from '@ui/common';
import { MyClientsService } from '../../services/my-clients.service';
import { MyClientsListUiComponent } from '../my-clients-list-ui/my-clients-list-ui.component';
import { FilesService } from '@utils/files';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';
import { BookingHistoryItemVM, ClientVM } from '../../types/clients.models';
import { MyClientsFilters } from '../../types/filters.models';
import { clientEntityAdapter } from '../../utils/client-entity.adapter';
import { MyClientsBookingHistoryUiComponent } from '../my-clients-booking-history-ui/my-clients-booking-history-ui.component';
import { SettingsTableViewContainerComponent, TableColumn } from '@tables/feature-settings-table-view';
import { StorageFacade } from '@storage/data-access-storage';

const CLIENTS_TABLE_SETTINGS: TableColumn[] = [
  {
    name: 'id',
    title: 'ID клиента',
    class: 'id',
    color: 'transparent',
    position: 1,
    enabled: true,
  },
  {
    name: 'fullName',
    title: 'ФИО клиента',
    class: 'full-name',
    color: 'transparent',
    position: 2,
    enabled: true,
  },
  {
    name: 'isVip',
    title: 'VIP',
    class: 'is-vip',
    color: 'transparent',
    position: 3,
    cellClass: 'vip-cell',
    enabled: true,
  },
  {
    name: 'phone',
    title: 'Телефон',
    class: 'phone',
    color: 'transparent',
    position: 4,
    enabled: true,
  },
  {
    name: 'email',
    title: 'Email',
    class: 'email',
    color: 'transparent',
    position: 5,
    enabled: true,
  },
  {
    name: 'bookingsCount',
    title: 'Количество броней',
    class: 'bookings-count',
    color: 'transparent',
    position: 6,
    cellClass: 'bookings-count-cell',
    enabled: true,
  },
];

const CLIENT_TABLE_SETTINGS_STORAGE_KEY = 'my-clients-settings-table';

@Component({
  selector: 'account-my-clients-container',
  standalone: true,
  imports: [
    CommonModule,
    MyClientsFiltersUiComponent,
    IsMobileDirective,
    UiCommonWriteExcelComponent,
    MyClientsListUiComponent,
    UiIndicatorsLoaderComponent,
    LetDirective,
    MyClientsBookingHistoryUiComponent,
    SettingsTableViewContainerComponent,
  ],
  providers: [MyClientsService],
  templateUrl: './my-clients-container.component.html',
  styleUrl: './my-clients-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyClientsContainerComponent implements OnInit {
  private readonly storageFacade = inject(StorageFacade);
  private readonly filesService = inject(FilesService);
  private readonly myClientsService = inject(MyClientsService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public readonly clients$: Observable<ClientVM[]> = this.myClientsService.clientsWithFilters$;
  public readonly objectsTitle$: Observable<string[]> = this.myClientsService.objectsTitle$.pipe(
    map((titles) => ['', ...titles])
  );
  public isMobile = false;
  public selectedBookingHistory: BookingHistoryItemVM[] | null = null;
  public isTableSettingsOpen = false;
  public tableSettings!: TableColumn[];

  ngOnInit(): void {
    this.storageFacade
      .getItem(CLIENT_TABLE_SETTINGS_STORAGE_KEY, { method: 'local' })
      .pipe(take(1))
      .subscribe((tableSettings) => {
        this.tableSettings = (tableSettings as TableColumn[]) ?? CLIENTS_TABLE_SETTINGS;
      });
  }

  public onIsMobileChange(isMobile: boolean): void {
    if (this.isMobile !== isMobile) {
      this.isMobile = isMobile;
      this.changeDetectorRef.detectChanges();
    }
  }

  public onChangeFilters(filters: MyClientsFilters): void {
    this.myClientsService.setFilters(filters);
  }

  public onChangeVip(id: number): void {
    this.clients$.pipe(take(1)).subscribe((clients) => {
      const client = clients.find((client) => client.id === id);
      if (!client) {
        throw Error('client change vip: client not found');
      }
      this.myClientsService.updateClient({
        ...client,
        isVip: !client.isVip,
      });
    });
  }

  public onShowClientBookingHistory(id: number): void {
    this.clients$.pipe(take(1)).subscribe((clients) => {
      const client = clients.find((client) => client.id === id);
      if (!client) {
        throw Error('onShowClientBookingHistory: client not found');
      }
      this.selectedBookingHistory = client.bookings;
    });
  }

  public onCloseShowClientBookingHistory(): void {
    this.selectedBookingHistory = null;
  }

  public onExportXLSX(): void {
    this.clients$.pipe(take(1)).subscribe((tableList: ClientVM[]) => {
      const tableExcelData = clientEntityAdapter.vmToXLSXFileData(tableList);
      this.filesService.createFile(tableExcelData, 'xlsx', {
        name: 'Мои клиенты',
        sheetName: 'Мои клиенты',
      });
    });
  }

  public onToggleTableSettings(isOpen: boolean): void {
    this.isTableSettingsOpen = isOpen;
  }

  public onChangeTableSettings(tableSettings: TableColumn[]): void {
    this.tableSettings = [...tableSettings];
    this.isTableSettingsOpen = false;
    this.storageFacade
      .setItem(CLIENT_TABLE_SETTINGS_STORAGE_KEY, tableSettings, { method: 'local' })
      .pipe(take(1))
      .subscribe();
  }
}
