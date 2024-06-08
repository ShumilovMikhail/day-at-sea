import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

import { ModalComponent } from '@layers';
import { RegisterUiComponent } from '../register-ui/register-ui.component';
import {
  loginCorrectlyValidator,
  containsSpacesValidator,
  fullNameValidator,
  latinLettersValidator,
} from '@utils/validators';
import {
  emailAvailableValidator,
  loginAvailableValidator,
} from '@auth/data-access';

@Component({
  selector: 'auth-register-container',
  standalone: true,
  imports: [CommonModule, ModalComponent, RegisterUiComponent],
  templateUrl: './register-container.component.html',
  styleUrl: './register-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterContainerComponent {
  private readonly fb = inject(FormBuilder);
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
}
