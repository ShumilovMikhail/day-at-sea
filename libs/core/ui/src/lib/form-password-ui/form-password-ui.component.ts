import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-form-password-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-password-ui.component.html',
  styleUrl: './form-password-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPasswordUiComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() label: string | undefined;
  @Input() required: boolean | undefined;
  @Input() placeholder: string | undefined;
  @Input() errors: string[] | undefined;
  public passwordHide = true;

  public onPasswordToggle(): void {
    this.passwordHide = !this.passwordHide;
  }
}
