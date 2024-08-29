import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type Colors = string[];

const COLORS: Colors = ['#FFE75F', '#34ACE0', '#FF5252', '#706FD3', '#40407A', '#FF7940', '#32D9B1', '#B33939'];

@Component({
  selector: 'account-settings-table-view-color-picker-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-table-view-color-picker-ui.component.html',
  styleUrl: './settings-table-view-color-picker-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsTableViewColorPickerUiComponent {
  @Output() pickColorEvent = new EventEmitter<string>();
  @Input({ required: true }) initialColor!: string;
  public readonly colors: Colors = COLORS;

  public onPickColorEvent(color: string): void {
    if (this.initialColor === color) return;
    this.pickColorEvent.emit(color);
  }
}
