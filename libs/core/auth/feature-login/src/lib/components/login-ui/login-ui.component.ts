import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UiFormsInputComponent, UiFormsPasswordComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'auth-login-ui',
  standalone: true,
  imports: [CommonModule, UiFormsInputComponent, UiFormsPasswordComponent, FormControlPipe, ReactiveFormsModule],
  templateUrl: './login-ui.component.html',
  styleUrl: './login-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginUiComponent {}
