import { ChangeDetectionStrategy, Component, input, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { UiFormsInputComponent, UiFormsPasswordComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'auth-login-form-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiFormsInputComponent, UiFormsPasswordComponent, FormControlPipe],
  templateUrl: './login-form-ui.component.html',
  styleUrl: './login-form-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormUiComponent {
  @Input({ required: true }) form!: FormGroup;
  public isLoading = input<boolean>();
  public error = input<string | null>();
  public submitEvent = output<void>();

  public onSubmit(): void {
    this.submitEvent.emit();
  }
}
