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
  selector: 'account-email-edit-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiFormsInputComponent, FormControlPipe],
  templateUrl: './email-edit-ui.component.html',
  styleUrl: './email-edit-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailEditUiComponent {
  @Input({ required: true }) set email(email: string) {
    this.mode = Mode.DEFAULT;
    this.emailDefault = email;
  }
  @Input({ required: true }) form!: FormGroup;
  @Input() loading = false;
  @Output() submitEvent = new EventEmitter<void>();
  @Output() cancelChangeEmailEvent = new EventEmitter<void>();
  public mode: Mode = Mode.DEFAULT;
  public emailDefault = '';

  public onChangeModeToEdit(): void {
    this.mode = Mode.EDIT;
  }

  public onChangeModeToDefault(): void {
    this.cancelChangeEmailEvent.emit();
    this.mode = Mode.DEFAULT;
  }

  public onSubmit(): void {
    this.submitEvent.emit();
  }
}
