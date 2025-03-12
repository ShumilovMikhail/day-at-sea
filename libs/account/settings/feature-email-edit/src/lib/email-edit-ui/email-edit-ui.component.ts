import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { UiFormsInputComponent } from '@ui/forms';
import { FormControlPipe } from '@utils/pipes';
import { Observable } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

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
export class EmailEditUiComponent implements OnInit {
  public email = input.required<string>();
  public form = input.required<FormGroup>();
  public loading = input.required<boolean>();
  public submitEvent = output<void>();
  public cancelChangeEmailEvent = output<void>();
  public mode: WritableSignal<Mode> = signal(Mode.DEFAULT);
  public emailDefault: WritableSignal<string> = signal('');
  private readonly destroyRef = inject(DestroyRef);
  private readonly email$: Observable<string> = toObservable(this.email);

  ngOnInit(): void {
    this.email$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((email: string) => {
      this.mode.set(Mode.DEFAULT);
      this.emailDefault.set(email);
    });
  }

  public onChangeModeToEdit(): void {
    this.mode.set(Mode.EDIT);
  }

  public onChangeModeToDefault(): void {
    this.cancelChangeEmailEvent.emit();
    this.mode.set(Mode.DEFAULT);
  }

  public onSubmit(): void {
    this.submitEvent.emit();
  }
}
