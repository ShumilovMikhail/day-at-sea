import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDirective } from '@utils/directives';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ui-forms-time',
  standalone: true,
  imports: [CommonModule, SelectDirective],
  templateUrl: './ui-forms-time.component.html',
  styleUrl: './ui-forms-time.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormsTimeComponent {
  private readonly hoursArray = new Array(24).fill(null).map((item, index) => `${index > 9 ? index : '0' + index}:00`);
  public readonly control = input<FormControl>();
  public readonly label = input<string>();
  public readonly placeholder = input<string>();
  public readonly options = signal<string[]>(this.hoursArray);
  public readonly selectedOption = input<string>();
  public readonly isSelecting = signal<boolean>(false);
  public readonly selectedOpt = signal<string | undefined>(this.selectedOption());

  constructor() {
    effect(
      () => {
        this.selectedOpt.set(this.selectedOption());
      },
      { allowSignalWrites: true }
    );
    console.log(this.hoursArray);
  }

  public onBlur(): void {
    this.isSelecting.set(false);
  }

  public onSelectOption(option: string): void {
    if (option === this.selectedOption()) {
      return;
    }
    this.selectedOpt.set(option);
    this.isSelecting.set(false);
    this.control()?.patchValue(option);
  }

  public onSelectClick(): void {
    this.isSelecting.set(!this.isSelecting());
  }
}
