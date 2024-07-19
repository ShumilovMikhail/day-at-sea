import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickOutsideDirective, SelectDirective } from '@utils/directives';

@Component({
  selector: 'ui-common-select',
  standalone: true,
  imports: [CommonModule, SelectDirective, ClickOutsideDirective],
  templateUrl: './ui-common-select.component.html',
  styleUrl: './ui-common-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCommonSelectComponent {
  @Input({ required: true }) options: string[] | null = null;
  @Input() selectedOption: string | null = null;
  @Input() placeholder: string | null = null;
  public isSelecting = false;

  public onSelectClick(): void {
    this.isSelecting = !this.isSelecting;
  }

  public onSelectOption(option: string): void {
    if (option === this.selectedOption) {
      return;
    }
    this.selectedOption = option;
    this.isSelecting = false;
  }

  public onBlur(): void {
    this.isSelecting = false;
  }
}
