import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-forms-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-forms-password.component.html',
  styleUrl: './ui-forms-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormsPasswordComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() label: string | undefined;
  @Input() required: boolean | undefined;
  @Input() placeholder: string | undefined;
  @Input() errors: string[] | undefined;
  public passwordHide = true;

  public onPasswordToggle(): void {
    this.passwordHide = !this.passwordHide;
  }
  public onFocus(): void {
    this.control.markAsUntouched();
  }
}
