import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../types/table-view.models';
import { SettingsTableViewColorPickerUiComponent } from '../settings-table-view-color-picker-ui/settings-table-view-color-picker-ui.component';
import { ClickOutsideDirective } from '@utils/directives';

@Component({
  selector: 'account-settings-table-view-ui',
  standalone: true,
  imports: [CommonModule, SettingsTableViewColorPickerUiComponent, ClickOutsideDirective],
  templateUrl: './settings-table-view-ui.component.html',
  styleUrl: './settings-table-view-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsTableViewUiComponent implements OnInit {
  @Output() saveTableSettingsEvent = new EventEmitter<TableColumn[]>();
  @Input({ required: true }) table!: TableColumn[];
  public sortedTable!: TableColumn[];
  public positionColorPicker: number | null = null;

  ngOnInit(): void {
    this.sortedTable = this.table.sort((a, b) => a.position - b.position);
  }

  public onShowColorPicker(position: number): void {
    this.positionColorPicker = position;
  }

  public onCloseColorPicker(): void {
    this.closeColorPicker();
  }

  public onChangeColumn(position: number, changes: Partial<TableColumn>): void {
    const tableColumnIndex = this.sortedTable.findIndex((column) => column.position === position);
    if (tableColumnIndex === -1) throw Error('onChangeColumn: column not found');
    this.sortedTable[tableColumnIndex] = {
      ...this.sortedTable[tableColumnIndex],
      ...changes,
    };
    this.closeColorPicker();
  }

  public onChangePosition(previousPosition: number, currentPosition: number): void {
    const columnOnCurrentPositionIndex = this.sortedTable.findIndex((column) => column.position === currentPosition);
    const columnIndex = this.sortedTable.findIndex((column) => column.position === previousPosition);
    if (columnOnCurrentPositionIndex !== -1) {
      this.sortedTable[columnOnCurrentPositionIndex] = {
        ...this.sortedTable[columnOnCurrentPositionIndex],
        position: previousPosition,
      };
    }
    if (columnIndex === -1) throw Error('onChangePosition: column in not defined');
    this.sortedTable[columnIndex] = {
      ...this.sortedTable[columnIndex],
      position: currentPosition,
    };
    this.sortTable();
  }

  public onSaveTableSettings(): void {
    this.saveTableSettingsEvent.emit(this.sortedTable);
  }

  private closeColorPicker(): void {
    this.positionColorPicker = null;
  }

  private sortTable(): void {
    this.sortedTable = this.sortedTable.sort((a, b) => a.position - b.position);
  }
}
