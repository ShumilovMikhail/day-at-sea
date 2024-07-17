import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, filter } from 'rxjs';

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
export class UsernameEditContainerComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly userFacade = inject(UserFacade);
  private readonly username$: Observable<string> = this.userFacade.username$.pipe(
    filter((username: string | null): username is string => Boolean(username))
  );
  public readonly form = this.fb.nonNullable.group({
    username: [
      '',
      [Validators.required, Validators.minLength(5), usernameCorrectlyValidator()],
      [usernameAvailableValidator()],
    ],
  });
  public loading = false;
  public username: string | null = null;

  ngOnInit(): void {
    this.username$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((username: string) => {
      this.form.patchValue({ username });
      this.username = username;
      this.loading = false;
      this.changeDetectorRef.detectChanges();
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.userFacade.changeUsername(this.form.value.username as string);
      this.loading = true;
    }
  }

  public cancelChangeUsername(): void {
    this.form.get('username')?.reset(this.username as string);
  }
}
