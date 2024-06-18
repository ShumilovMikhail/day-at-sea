import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, filter, map } from 'rxjs';

import { AuthFacade, UserEntity, loginAvailableValidator } from '@auth/data-access';
import { LoginEditUiComponent } from '../login-edit-ui/login-edit-ui.component';
import { loginCorrectlyValidator } from '@utils/validators';
import { RegisterContainerComponent } from '@auth/feature-register';

@Component({
  selector: 'account-login-edit-container',
  standalone: true,
  imports: [CommonModule, LoginEditUiComponent, RegisterContainerComponent],
  templateUrl: './login-edit-container.component.html',
  styleUrl: './login-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginEditContainerComponent implements OnInit {
  private readonly authFacade = inject(AuthFacade);
  private readonly fb = inject(FormBuilder);
  public readonly login$: Observable<string | null> = this.authFacade.user$.pipe(
    map((user: UserEntity | null) => (user?.login ? user?.login : null))
  );
  public readonly loading$: Observable<boolean> = this.authFacade.loading$;
  public readonly form = this.fb.nonNullable.group({
    login: ['', [Validators.required, Validators.minLength(5), loginCorrectlyValidator()], [loginAvailableValidator()]],
  });

  ngOnInit(): void {
    this.login$.pipe(filter((login: string | null): login is string => Boolean(login))).subscribe((login: string) => {
      this.form.patchValue({ login });
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.authFacade.changeLogin(this.form.value.login as string);
    }
  }
}
