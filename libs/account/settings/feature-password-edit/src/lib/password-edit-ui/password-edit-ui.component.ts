import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { UiFormsInputComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';

enum Mode {
  DEFAULT = 'default',
  EDIT = 'edit',
}

@Component({
  selector: 'account-password-edit-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiFormsInputComponent, FormControlPipe],
  templateUrl: './password-edit-ui.component.html',
  styleUrl: './password-edit-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordEditUiComponent {
  @Input({ required: true }) set password(password: string) {
    this.mode = Mode.DEFAULT;
  }
  @Input({ required: true }) form!: FormGroup;
  @Input() loading = false;
  @Output() submitEvent = new EventEmitter<void>();
  public mode: Mode = Mode.DEFAULT;

  public onChangeModeToEdit(): void {
    this.mode = Mode.EDIT;
  }

  public onChangeModeToDefault(): void {
    this.form.get('password')?.reset('');
    this.form.get('conformPassword')?.reset('');
    this.mode = Mode.DEFAULT;
  }

  public onSubmit(): void {
    this.submitEvent.emit();
  }
}
