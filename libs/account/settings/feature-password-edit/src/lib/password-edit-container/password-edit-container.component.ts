import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

import { UserFacadeSignal } from '@auth/data-access';
import { Observable, filter } from 'rxjs';
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
export class PasswordEditContainerComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly userFacade = inject(UserFacadeSignal);
  private readonly password$: Observable<string> = toObservable(this.userFacade.userPassword$).pipe(
    filter((password: string | null): password is string => Boolean(password))
  );
  public readonly form = this.fb.nonNullable.group({
    password: ['', [Validators.required, Validators.minLength(8), containsSpacesValidator(), latinLettersValidator()]],
    conformPassword: ['', [Validators.required, conformPasswordValidator()]],
  });
  public loading = signal(false);
  public password: WritableSignal<string | null> = signal(null);

  ngOnInit(): void {
    this.password$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((password: string) => {
      this.loading.set(false);
      this.password.set(password);
      this.changeDetectorRef.detectChanges();
    });
  }

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
