import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { RegisterFormUiComponent } from '../register-form-ui/register-form-ui.component';
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
  @Input() isLoading!: boolean | undefined;
  @Output() submitEvent = new EventEmitter<void>();

  public onSubmit(): void {
    this.submitEvent.emit();
  }
}
