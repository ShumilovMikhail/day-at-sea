import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, Observable, shareReplay, take } from 'rxjs';
import { LetDirective } from '@ngrx/component';

import { MyObjectsTableList, MyObjectTableItem, ObjectEditForm } from '../../types/my-objects-vm.models';
import { MyObjectsTableUiComponent } from '../my-objects-table-ui/my-objects-table-ui.component';
import { IsMobileDirective } from '@utils/directives';
import { MyObjectsListMobileUiComponent } from '../my-objects-list-mobile-ui/my-objects-list-mobile-ui.component';
import { MyObjectsFiltersUiComponent } from '../my-objects-filters-ui/my-objects-filters-ui.component';
import { MyObjectsStore } from './my-objects-container.store';
import { MyObjectsFilters, ObjectEdit } from '../../types/my-objects-state';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';
import { MyObjectsEditModalUiComponent } from '../my-objects-edit-modal-ui/my-objects-edit-modal-ui.component';
import { UiCommonWriteExcelComponent } from '@ui/common';
import { myObjectsEntityAdapter } from './my-objects-entity.adapter';
import { FilesService } from '@utils/files';

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
    MyObjectsEditModalUiComponent,
    LetDirective,
    UiCommonWriteExcelComponent,
  ],
  providers: [MyObjectsStore],
  templateUrl: './my-objects-container.component.html',
  styleUrl: './my-objects-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyObjectsContainerComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly filesService = inject(FilesService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly myObjectsStore = inject(MyObjectsStore);
  public readonly salesChannels$: Observable<string[] | null> = this.myObjectsStore.salesChannels$;
  public readonly myObjectWithFilters$: Observable<MyObjectsTableList> = this.myObjectsStore.myObjectsWithFilters.pipe(
    filter((myObjects: MyObjectsTableList | null): myObjects is MyObjectsTableList => Boolean(myObjects)),
    shareReplay(1)
  );
  public readonly objectEditForm: FormGroup<ObjectEditForm> = this.fb.nonNullable.group({
    title: [''],
    status: ['', [Validators.required, Validators.minLength(3)]],
    bookingMethod: ['', [Validators.required, Validators.minLength(3)]],
    salesChannel: [''] as unknown as FormControl<string | null>,
  });
  public readonly loading$: Observable<boolean> = this.myObjectsStore.loading$;
  public isMobile = false;
  public selectedObjectId: number | null = null;

  constructor(title: Title) {
    title.setTitle('Мои объекты');
  }

  ngOnInit(): void {
    this.myObjectWithFilters$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.closeEditModal();
    });
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

  public onEditObject(object: MyObjectTableItem): void {
    this.selectedObjectId = object.id;
    this.objectEditForm.patchValue({
      title: object.title,
      status: object.status,
      bookingMethod: object.bookingMethod,
      salesChannel: object.salesChannel,
    });
  }

  public onEditObjectModalClose(): void {
    this.closeEditModal();
  }

  public onSubmitObjectSubmit(): void {
    this.myObjectsStore.editObject(this.selectedObjectId as number, this.objectEditForm.value as ObjectEdit);
  }

  public onExportTableToExcel(): void {
    this.myObjectWithFilters$.pipe(take(1)).subscribe((tableList: MyObjectsTableList) => {
      const tableExcelData = myObjectsEntityAdapter.VMToExcelData(tableList);
      this.filesService.createFile(tableExcelData, 'xlsx', {
        name: 'Мои объекты',
        sheetName: 'Мои объекты',
      });
    });
  }

  private closeEditModal(): void {
    this.selectedObjectId = null;
    this.objectEditForm.reset({
      title: '',
      status: '',
      bookingMethod: '',
      salesChannel: '',
    });
  }
}
