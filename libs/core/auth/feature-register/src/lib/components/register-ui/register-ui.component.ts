import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'auth-register-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-ui.component.html',
  styleUrl: './register-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterUiComponent {}
