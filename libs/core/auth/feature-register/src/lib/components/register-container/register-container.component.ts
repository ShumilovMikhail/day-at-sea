import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

import { ModalComponent } from '@layers';
import { RegisterUiComponent } from '../register-ui/register-ui.component';
import {
  usernameCorrectlyValidator,
  containsSpacesValidator,
  fullNameValidator,
  latinLettersValidator,
} from '@utils/validators';
import { AuthFacadeSignal, emailAvailableValidator, usernameAvailableValidator } from '@auth/data-access';
import { RegisterFormUiComponent } from '../register-form-ui/register-form-ui.component';

interface RegisterForm {
  username: string;
  password: string;
  email: string;
  fullName: string;
}

@Component({
  selector: 'auth-register-container',
  standalone: true,
  imports: [CommonModule, ModalComponent, RegisterUiComponent, RegisterFormUiComponent],
  templateUrl: './register-container.component.html',
  styleUrl: './register-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterContainerComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authFacade = inject(AuthFacadeSignal);
  public readonly isLoading$: Signal<boolean> = this.authFacade.loading$;
  public readonly form = this.fb.nonNullable.group({
    username: [
      '',
      [Validators.required, Validators.minLength(5), usernameCorrectlyValidator()],
      [usernameAvailableValidator()],
    ],
    email: ['', [Validators.required, Validators.email], [emailAvailableValidator()]],
    fullName: ['', [Validators.required, fullNameValidator()]],
    password: ['', [Validators.required, Validators.minLength(8), containsSpacesValidator(), latinLettersValidator()]],
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.authFacade.register(this.form.value as RegisterForm);
    }
  }
}
