import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-form-input-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-input-ui.component.html',
  styleUrl: './form-input-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputUiComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() label: string | undefined;
  @Input() required: boolean | undefined;
  @Input() placeholder: string | undefined;
  @Input() errors: string[] | undefined;
}
