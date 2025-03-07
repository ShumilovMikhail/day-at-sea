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
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, filter } from 'rxjs';

import { emailAvailableValidator, UserFacadeSignal } from '@auth/data-access';
import { EmailEditUiComponent } from '../email-edit-ui/email-edit-ui.component';

@Component({
  selector: 'account-email-edit-container',
  standalone: true,
  imports: [CommonModule, EmailEditUiComponent],
  templateUrl: './email-edit-container.component.html',
  styleUrl: './email-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailEditContainerComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly userFacade = inject(UserFacadeSignal);
  private readonly email$: Observable<string> = toObservable(this.userFacade.userEmail$).pipe(
    filter((email: string | null): email is string => Boolean(email))
  );
  public readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email], [emailAvailableValidator()]],
  });
  public loading: WritableSignal<boolean> = signal<boolean>(false);
  public email: WritableSignal<string | null> = signal<string | null>(null);

  ngOnInit(): void {
    this.email$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((email: string) => {
      this.form.patchValue({ email });
      this.loading.set(false);
      this.email.set(email);
      this.changeDetectorRef.detectChanges();
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.loading.set(true);
      this.userFacade.changeUserEmail(this.form.value.email as string);
    }
  }

  public onCancelChangeEmail(): void {
    this.form.get('email')?.patchValue(this.email() as string);
  }
}
