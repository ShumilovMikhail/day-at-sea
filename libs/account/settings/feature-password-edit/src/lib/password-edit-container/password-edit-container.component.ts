import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  WritableSignal,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

import { UserFacade } from '@auth/data-access';
import { conformPasswordValidator, containsSpacesValidator, latinLettersValidator } from '@utils/validators';
import { PasswordEditUiComponent } from '../password-edit-ui/password-edit-ui.component';

@Component({
  selector: 'account-password-edit-container',
  standalone: true,
  imports: [CommonModule, PasswordEditUiComponent],
  templateUrl: './password-edit-container.component.html',
  styleUrl: './password-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordEditContainerComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly userFacade = inject(UserFacade);
  public readonly form = this.fb.nonNullable.group({
    password: ['', [Validators.required, Validators.minLength(8), containsSpacesValidator(), latinLettersValidator()]],
    conformPassword: ['', [Validators.required, conformPasswordValidator()]],
  });
  public loading = signal(false);
  public password: WritableSignal<string | null> = signal(null);
  private readonly passwordEffect = effect(() => {
    const password = this.userFacade.userPassword();
    untracked(() => {
      if (password) {
        this.loading.set(false);
        this.password.set(password);
        this.changeDetectorRef.detectChanges();
      }
    });
  });

  public onCancelChangePassword(): void {
    this.form.get('password')?.reset('');
    this.form.get('conformPassword')?.reset('');
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.userFacade.changeUserPassword(this.form.value.password as string);
      this.loading.set(true);
    }
  }
}
