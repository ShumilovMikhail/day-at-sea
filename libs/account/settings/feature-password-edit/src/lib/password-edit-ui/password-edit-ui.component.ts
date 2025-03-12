import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  input,
  Input,
  OnInit,
  output,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { UiFormsInputComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { takeUntil } from 'rxjs';

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
export class PasswordEditUiComponent implements OnInit {
  public password = input.required<string>();
  public form = input.required<FormGroup>();
  public loading = input.required<boolean>();
  public submitEvent = output<void>();
  public cancelChangePasswordEvent = output<void>();
  private readonly destroyRef = inject(DestroyRef);
  private readonly password$ = toObservable(this.password);
  public mode = signal<Mode>(Mode.DEFAULT);

  ngOnInit(): void {
    this.password$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((password: string) => {
      this.changeModeToDefault();
    });
  }

  public onChangeModeToEdit(): void {
    this.mode.set(Mode.EDIT);
  }

  public onChangeModeToDefault(): void {
    this.cancelChangePasswordEvent.emit();
    this.mode.set(Mode.DEFAULT);
  }

  public onSubmit(): void {
    this.submitEvent.emit();
  }

  private changeModeToDefault(): void {
    this.mode.set(Mode.DEFAULT);
  }
}
