import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from '@layers';
import { LoginUiComponent } from '../login-ui/login-ui.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'auth-login-container',
  standalone: true,
  imports: [CommonModule, ModalComponent, LoginUiComponent],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {
  private readonly fb = inject(FormBuilder);
  public readonly form = this.fb.group({
    loginOrEmail: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public onSubmit(): void {}
}
