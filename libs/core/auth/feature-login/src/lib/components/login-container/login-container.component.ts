import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

import { ModalComponent } from '@layers';
import { LoginUiComponent } from '../login-ui/login-ui.component';
import { AuthFacadeSignal } from '@auth/data-access';
import { errorsVMAdapter } from './errors-vm.adapter';
import { LoginFormUiComponent } from '../login-form-ui/login-form-ui.component';

interface LoginForm {
  usernameOrEmail: string;
  password: string;
}

@Component({
  selector: 'auth-login-container',
  standalone: true,
  imports: [CommonModule, ModalComponent, LoginUiComponent, LoginFormUiComponent],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {
  private readonly authFacade = inject(AuthFacadeSignal);
  private readonly fb = inject(FormBuilder);
  public readonly isLoading$: Signal<boolean> = this.authFacade.loading$;
  public readonly form = this.fb.group({
    usernameOrEmail: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  public readonly errors$: Signal<string | null> = computed(() => {
    const error = this.authFacade.error$();
    return error ? errorsVMAdapter.errorsDTOToVM(error) : null;
  });

  public onSubmit(): void {
    if (this.form.valid) {
      this.authFacade.login(this.form.value as LoginForm);
    }
  }
}
