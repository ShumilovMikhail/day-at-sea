import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterFormUiComponent } from '../register-form-ui/register-form-ui.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'auth-register-ui',
  standalone: true,
  imports: [CommonModule, RegisterFormUiComponent],
  templateUrl: './register-ui.component.html',
  styleUrl: './register-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterUiComponent {
  @Input({ required: true }) registerForm!: FormGroup;
}
