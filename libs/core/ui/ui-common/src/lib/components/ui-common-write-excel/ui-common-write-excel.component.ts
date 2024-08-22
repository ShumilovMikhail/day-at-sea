import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-common-write-excel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-common-write-excel.component.html',
  styleUrl: './ui-common-write-excel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCommonWriteExcelComponent {
  @Output() clickEvent = new EventEmitter<void>();

  public onClick(): void {
    this.clickEvent.emit();
  }
}
