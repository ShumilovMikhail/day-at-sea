import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PushPipe } from '@ngrx/component';

import { ModalComponent } from '@layers';
import { RegisterUiComponent } from '../register-ui/register-ui.component';
import {
  loginCorrectlyValidator,
  containsSpacesValidator,
  fullNameValidator,
  latinLettersValidator,
} from '@utils/validators';
import {
  AuthFacade,
  emailAvailableValidator,
  loginAvailableValidator,
} from '@auth/data-access';

interface RegisterForm {
  login: string;
  password: string;
  email: string;
  fullName: string;
}

@Component({
  selector: 'auth-register-container',
  standalone: true,
  imports: [CommonModule, ModalComponent, RegisterUiComponent, PushPipe],
  templateUrl: './register-container.component.html',
  styleUrl: './register-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterContainerComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authFacade = inject(AuthFacade);
  public readonly isLoading$: Observable<boolean> = this.authFacade.loading$;
  public readonly form = this.fb.group({
    login: [
      '',
      [Validators.required, Validators.minLength(5), loginCorrectlyValidator()],
      [loginAvailableValidator()],
    ],
    email: [
      '',
      [Validators.required, Validators.email],
      [emailAvailableValidator()],
    ],
    fullName: ['', [Validators.required, fullNameValidator()]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        containsSpacesValidator(),
        latinLettersValidator(),
      ],
    ],
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.authFacade.register(this.form.value as RegisterForm);
    }
  }
}
