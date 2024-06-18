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
  selector: 'account-username-edit-ui',
  standalone: true,
  imports: [CommonModule, UiFormsInputComponent, ReactiveFormsModule, FormControlPipe],
  templateUrl: './username-edit-ui.component.html',
  styleUrl: './username-edit-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsernameEditUiComponent {
  @Input({ required: true }) set username(username: string) {
    this.mode = Mode.DEFAULT;
    this.usernameDefault = username;
  }
  @Input({ required: true }) form!: FormGroup;
  @Input() loading = false;
  @Output() submitEvent = new EventEmitter<void>();
  public mode: Mode = Mode.DEFAULT;
  public usernameDefault = '';

  public onChangeModeToEdit(): void {
    this.mode = Mode.EDIT;
  }

  public onChangeModeToDefault(): void {
    this.form.get('username')?.reset(this.usernameDefault);
    this.mode = Mode.DEFAULT;
  }

  public onSubmit(): void {
    this.submitEvent.emit();
  }
}
