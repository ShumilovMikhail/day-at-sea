import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, filter, map, tap } from 'rxjs';

import { AuthFacade, UserEntity, emailAvailableValidator } from '@auth/data-access';
import { EmailEditUiComponent } from '../email-edit-ui/email-edit-ui.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private readonly authFacade = inject(AuthFacade);
  private readonly email$: Observable<string> = this.authFacade.userEmail$.pipe(
    filter((email: string | null): email is string => Boolean(email))
  );
  public readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email], [emailAvailableValidator()]],
  });
  public loading = false;
  public email: string | null = null;

  ngOnInit(): void {
    this.email$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((email: string) => {
      this.form.patchValue({ email });
      this.loading = false;
      this.email = email;
      this.changeDetectorRef.detectChanges();
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.authFacade.changeUserEmail(this.form.value.email as string);
    }
  }
}
