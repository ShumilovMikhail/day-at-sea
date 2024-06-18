import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, filter, map } from 'rxjs';

import { AuthFacade, UserEntity, usernameAvailableValidator } from '@auth/data-access';
import { UsernameEditUiComponent } from '../username-edit-ui/username-edit-ui.component';
import { usernameCorrectlyValidator } from '@utils/validators';
import { RegisterContainerComponent } from '@auth/feature-register';

@Component({
  selector: 'account-username-edit-container',
  standalone: true,
  imports: [CommonModule, UsernameEditUiComponent, RegisterContainerComponent],
  templateUrl: './username-edit-container.component.html',
  styleUrl: './username-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsernameEditContainerComponent implements OnInit {
  private readonly authFacade = inject(AuthFacade);
  private readonly fb = inject(FormBuilder);
  public readonly username$: Observable<string | null> = this.authFacade.user$.pipe(
    map((user: UserEntity | null) => (user?.username ? user?.username : null))
  );
  public readonly loading$: Observable<boolean> = this.authFacade.loading$;
  public readonly form = this.fb.nonNullable.group({
    username: [
      '',
      [Validators.required, Validators.minLength(5), usernameCorrectlyValidator()],
      [usernameAvailableValidator()],
    ],
  });

  ngOnInit(): void {
    this.username$
      .pipe(filter((username: string | null): username is string => Boolean(username)))
      .subscribe((username: string) => {
        this.form.patchValue({ username });
      });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.authFacade.changeLogin(this.form.value.username as string);
    }
  }
}
