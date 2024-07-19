import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';

import { SelectDirective } from '@utils/directives';
import { ClickOutsideDirective } from '@utils/directives';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ui-forms-select',
  standalone: true,
  imports: [CommonModule, SelectDirective, ClickOutsideDirective],
  templateUrl: './ui-forms-select.component.html',
  styleUrl: './ui-forms-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormsSelectComponent implements OnInit {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) options: string[] | null = null;
  @Input() selectedOption: string | null = null;
  @Input() label: string | undefined;
  @Input() placeholder: string | null = null;
  @Input() disabled = false;
  private readonly destroyRef = inject(DestroyRef);
  public isSelecting = false;

  ngOnInit(): void {
    this.control.patchValue(this.selectedOption);
    this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.selectedOption = value;
    });
  }

  public onSelectClick(): void {
    if (!this.disabled) {
      this.isSelecting = !this.isSelecting;
    }
  }

  public onSelectOption(option: string): void {
    if (option === this.selectedOption) {
      return;
    }
    this.selectedOption = option;
    this.isSelecting = false;
    this.control.patchValue(option);
  }

  public onBlur(): void {
    this.isSelecting = false;
  }
}
