import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

import { UserFacade, usernameAvailableValidator } from '@auth/data-access';
import { UsernameEditUiComponent } from '../username-edit-ui/username-edit-ui.component';
import { usernameCorrectlyValidator } from '@utils/validators';

@Component({
  selector: 'account-username-edit-container',
  standalone: true,
  imports: [CommonModule, UsernameEditUiComponent],
  templateUrl: './username-edit-container.component.html',
  styleUrl: './username-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsernameEditContainerComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly userFacade = inject(UserFacade);
  public readonly form = this.fb.nonNullable.group({
    username: [
      '',
      [Validators.required, Validators.minLength(5), usernameCorrectlyValidator()],
      [usernameAvailableValidator()],
    ],
  });
  public loading = signal(false);
  public username = signal<string | null>(null);
  private readonly usernameEffect = effect(() => {
    const username = this.userFacade.username();
    untracked(() => {
      if (username) {
        this.form.patchValue({ username });
        this.username.set(username);
        this.loading.set(false);
        this.changeDetectorRef.detectChanges();
      }
    });
  });

  public onSubmit(): void {
    if (this.form.valid) {
      this.userFacade.changeUsername(this.form.value.username as string);
      this.loading.set(true);
    }
  }

  public cancelChangeUsername(): void {
    this.form.get('username')?.reset(this.username() as string);
  }
}
