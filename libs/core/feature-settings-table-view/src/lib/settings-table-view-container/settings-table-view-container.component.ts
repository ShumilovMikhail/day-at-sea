import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsTableViewUiComponent } from '../settings-table-view-ui/settings-table-view-ui.component';
import { TableColumn } from '../types/table-view.models';

@Component({
  selector: 'account-settings-table-view-container',
  standalone: true,
  imports: [CommonModule, SettingsTableViewUiComponent],
  templateUrl: './settings-table-view-container.component.html',
  styleUrl: './settings-table-view-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsTableViewContainerComponent {
  @Output() closeDialogBoxEvent = new EventEmitter<void>();
  @Output() saveTableSettingsEvent = new EventEmitter<TableColumn[]>();
  @Input({ required: true }) table!: TableColumn[];

  public onCrossClick(): void {
    this.closeDialogBoxEvent.emit();
  }

  public onSaveTableSettings(table: TableColumn[]): void {
    this.saveTableSettingsEvent.emit(table);
  }
}
