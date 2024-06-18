import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { UiFormsInputComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

enum Mode {
  DEFAULT = 'default',
  EDIT = 'edit',
}

@Component({
  selector: 'account-login-edit-ui',
  standalone: true,
  imports: [CommonModule, UiFormsInputComponent, ReactiveFormsModule, FormControlPipe],
  templateUrl: './login-edit-ui.component.html',
  styleUrl: './login-edit-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginEditUiComponent {
  @Input({ required: true }) set login(login: string) {
    this.mode = Mode.DEFAULT;
    this.loginDefault = login;
  }
  @Input({ required: true }) form!: FormGroup;
  @Input() loading = false;
  @Output() submitEvent = new EventEmitter<void>();
  public mode: Mode = Mode.DEFAULT;
  public loginDefault = '';

  public onChangeModeToEdit(): void {
    this.mode = Mode.EDIT;
  }

  public onChangeModeToDefault(): void {
    this.form.get('login')?.reset(this.login);
    this.mode = Mode.DEFAULT;
  }

  public onSubmit(): void {
    this.submitEvent.emit();
  }
}
