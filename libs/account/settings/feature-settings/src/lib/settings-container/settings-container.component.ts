import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { Title } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';

import { SettingsUiComponent } from '../settings-ui/settings-ui.component';
import { AuthFacade, UserEntity } from '@auth/data-access';
import { AgencyEntity, AgencyFacade } from '@account/data-access-agency';
import { AgencyVM, UserVM } from '../types/settings.models';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';
import { agencyEntityVMAdapter } from './agency-entity-vm.adapter';

@Component({
  selector: 'account-settings-container',
  standalone: true,
  imports: [
    CommonModule,
    SettingsUiComponent,
    LetDirective,
    UiIndicatorsLoaderComponent,
  ],
  templateUrl: './settings-container.component.html',
  styleUrl: './settings-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsContainerComponent {
  private readonly authFacade = inject(AuthFacade);
  private readonly agencyFacade = inject(AgencyFacade);
  public readonly userVM$: Observable<UserVM | null> =
    this.authFacade.user$.pipe(
      map((user: UserEntity | null) => {
        if (!user) {
          return null;
        }
        return {
          login: user.login,
          email: user.email,
        };
      })
    );
  public readonly agencyVM$: Observable<AgencyVM | null> =
    this.agencyFacade.agency$.pipe(
      map((agency: AgencyEntity | null) =>
        agencyEntityVMAdapter.entityToVM(agency)
      )
    );

  constructor(private readonly title: Title) {
    title.setTitle('Настройки');
  }
}
