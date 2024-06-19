import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { AuthEditUiComponent } from '../auth-edit-ui/auth-edit-ui.component';
import { UsernameEditContainerComponent } from '@account/settings/feature-username-edit';
import { AuthFacade } from '@auth/data-access';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';
import { EmailEditContainerComponent } from '@account/settings/feature-email-edit';

@Component({
  selector: 'account-auth-edit-container',
  standalone: true,
  imports: [
    CommonModule,
    AuthEditUiComponent,
    UsernameEditContainerComponent,
    UiIndicatorsLoaderComponent,
    EmailEditContainerComponent,
  ],
  templateUrl: './auth-edit-container.component.html',
  styleUrl: './auth-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthEditContainerComponent {
  private readonly authFacade = inject(AuthFacade);
  public readonly isAuthenticate$: Observable<boolean> = this.authFacade.isAuthenticate$;
  constructor(title: Title) {
    title.setTitle('Настройки');
  }
}
