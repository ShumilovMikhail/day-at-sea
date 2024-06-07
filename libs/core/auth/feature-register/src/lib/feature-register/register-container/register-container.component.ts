import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

import { ModalComponent } from '@layers';
import { RegisterUiComponent } from '../register-ui/register-ui.component';

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
    login: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    fullName: '',
    password: '',
  });
}
