import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';

import { ModalComponent } from '@layers';
import { LoginUiComponent } from '../login-ui/login-ui.component';
import { AuthFacade } from '@auth/data-access';
import { errorsVMAdapter } from './errors-vm.adapter';

interface LoginForm {
  loginOrEmail: string;
  password: string;
}

interface FormError {
  message: string;
}

@Component({
  selector: 'auth-login-container',
  standalone: true,
  imports: [CommonModule, ModalComponent, LoginUiComponent],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {
  private readonly authFacade = inject(AuthFacade);
  private readonly fb = inject(FormBuilder);
  public readonly form = this.fb.group({
    loginOrEmail: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  public readonly errors$: Observable<string | null> =
    this.authFacade.error$.pipe(
      map((error: FormError | null) => {
        return error ? errorsVMAdapter.errorsDTOToVM(error) : null;
      })
    );

  public onSubmit(): void {
    if (this.form.valid) {
      this.authFacade.login(this.form.value as LoginForm);
    }
  }
}
