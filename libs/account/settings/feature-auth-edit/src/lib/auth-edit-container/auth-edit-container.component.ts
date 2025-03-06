import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { AuthEditUiComponent } from '../auth-edit-ui/auth-edit-ui.component';
import { UsernameEditContainerComponent } from '@account/settings/feature-username-edit';
import { AuthFacade } from '@auth/data-access';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';
import { EmailEditContainerComponent } from '@account/settings/feature-email-edit';
import { PasswordEditContainerComponent } from '@account/settings/feature-password-edit';
import { Router } from '@angular/router';

@Component({
  selector: 'account-auth-edit-container',
  standalone: true,
  imports: [
    CommonModule,
    AuthEditUiComponent,
    UsernameEditContainerComponent,
    UiIndicatorsLoaderComponent,
    EmailEditContainerComponent,
    PasswordEditContainerComponent,
  ],
  templateUrl: './auth-edit-container.component.html',
  styleUrl: './auth-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthEditContainerComponent {
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);
  public readonly isAuthenticate$: Signal<boolean> = this.authFacade.isAuthenticate$;
  constructor(title: Title) {
    title.setTitle('Настройки - Данные для входа');
  }

  public onBack(): void {
    this.router.navigateByUrl('account/settings');
  }
}
