import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, share, shareReplay, take, tap } from 'rxjs';

import { IsMobileDirective } from '@utils/directives';
import { UiCommonWriteExcelComponent } from '@ui/common';
import { MoveVMService } from '../../services/move-vm.service';
import { FilesService } from '@utils/files';
import { moveEntityAdapter } from '../../utils/move-entity.adapter';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';
import { MoveListUiComponent } from '../move-list-ui/move-list-ui.component';
import { MoveVM } from '../../types/moving.models';

@Component({
  selector: 'account-move-container',
  standalone: true,
  imports: [
    CommonModule,
    IsMobileDirective,
    UiCommonWriteExcelComponent,
    UiIndicatorsLoaderComponent,
    MoveListUiComponent,
  ],
  providers: [MoveVMService],
  templateUrl: './move-container.component.html',
  styleUrl: './move-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoveContainerComponent implements OnInit {
  private readonly filesService = inject(FilesService);
  private readonly moveVMService = inject(MoveVMService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  public readonly moveVM$: Observable<MoveVM[]> = this.moveVMService.movingVM$.pipe(shareReplay());
  public isMobile = false;

  ngOnInit(): void {
    this.moveVMService.initMoving();
  }

  public onIsMobileChange(isMobile: boolean): void {
    if (this.isMobile !== isMobile) {
      this.isMobile = isMobile;
      this.changeDetectorRef.detectChanges();
    }
  }

  onExportXLSX(): void {
    this.moveVM$.pipe(take(1)).subscribe((tableList: MoveVM[]) => {
      console.log(1);
      const tableExcelData = moveEntityAdapter.vmToXLSXFileData(tableList);
      this.filesService.createFile(tableExcelData, 'xlsx', {
        name: 'Заезды и Выезды',
        sheetName: 'Заезды и Выезды',
      });
    });
  }
}
