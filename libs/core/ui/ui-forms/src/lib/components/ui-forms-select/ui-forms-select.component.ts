import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ui-forms-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-forms-select.component.html',
  styleUrl: './ui-forms-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormsSelectComponent implements OnInit {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) options: string[] | null = null;
  @Input() selectedOption: string | null = null;
  @Input() label: string | undefined;
  public isSelecting = false;

  ngOnInit(): void {
    this.control.patchValue(this.selectedOption);
  }

  public onSelectClick(): void {
    this.isSelecting = !this.isSelecting;
  }

  public onSelectOption(option: string): void {
    if (option === this.selectedOption) {
      return;
    }
    this.selectedOption = option;
    this.isSelecting = false;
    this.control.patchValue(option);
  }
}
