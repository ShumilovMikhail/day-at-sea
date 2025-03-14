import { ChangeDetectionStrategy, Component, effect, input, output, signal, untracked } from '@angular/core';
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
  public username = input.required<string>();
  public form = input.required<FormGroup>();
  public loading = input<boolean>(false);
  public submitEvent = output<void>();
  public cancelChangeUsernameEvent = output<void>();
  public mode = signal<Mode>(Mode.DEFAULT);
  public usernameDefault = signal<string>('');
  private readonly usernameEffect = effect(() => {
    const username = this.username();
    untracked(() => {
      this.mode.set(Mode.DEFAULT);
      this.usernameDefault.set(username as string);
    });
  });

  public onChangeModeToEdit(): void {
    this.mode.set(Mode.EDIT);
  }

  public onChangeModeToDefault(): void {
    this.cancelChangeUsernameEvent.emit();
    this.mode.set(Mode.DEFAULT);
  }

  public onSubmit(): void {
    this.submitEvent.emit();
  }
}
