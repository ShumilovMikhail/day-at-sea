import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { UiFormsInputComponent, UiFormsPasswordComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

@Component({
  selector: 'auth-login-form-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiFormsInputComponent, UiFormsPasswordComponent, FormControlPipe],
  templateUrl: './login-form-ui.component.html',
  styleUrl: './login-form-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormUiComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input() isLoading!: boolean | undefined;
  @Input() error!: string | null;
  @Output() submitEvent = new EventEmitter<void>();

  public onSubmit(): void {
    this.submitEvent.emit();
  }
}
