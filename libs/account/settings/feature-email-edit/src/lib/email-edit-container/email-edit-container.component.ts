import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  WritableSignal,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

import { emailAvailableValidator, UserFacade } from '@auth/data-access';
import { EmailEditUiComponent } from '../email-edit-ui/email-edit-ui.component';

@Component({
  selector: 'account-email-edit-container',
  standalone: true,
  imports: [CommonModule, EmailEditUiComponent],
  templateUrl: './email-edit-container.component.html',
  styleUrl: './email-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailEditContainerComponent {
  private readonly fb = inject(FormBuilder);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly userFacade = inject(UserFacade);
  public readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email], [emailAvailableValidator()]],
  });
  public loading: WritableSignal<boolean> = signal<boolean>(false);
  public email: WritableSignal<string | null> = signal<string | null>(null);
  private readonly emailEffect = effect(() => {
    const email = this.userFacade.userEmail();
    untracked(() => {
      if (email) {
        this.form.patchValue({ email });
        this.loading.set(false);
        this.email.set(email);
        this.changeDetectorRef.detectChanges();
      }
    });
  });

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
