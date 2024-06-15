import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-forms-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-forms-input.component.html',
  styleUrl: './ui-forms-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormsInputComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() label: string | undefined;
  @Input() required: boolean | undefined;
  @Input() placeholder: string | undefined;
  @Input() errors: string[] | undefined;
  @Input() crossEnable = false;

  public onFocus(): void {
    this.control.markAsUntouched();
  }

  onReset() {
    this.control.patchValue('');
  }
}
