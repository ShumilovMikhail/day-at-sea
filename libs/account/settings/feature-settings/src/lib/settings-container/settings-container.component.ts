import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { Title } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';

import { SettingsUiComponent } from '../settings-ui/settings-ui.component';
import { UserEntity, UserFacade } from '@auth/data-access';
import { AgencyEntity, AgencyFacade } from '@account/data-access-agency';
import { AgencyVM, UserVM } from '../types/settings.models';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';
import { agencyEntityVMAdapter } from './agency-entity-vm.adapter';

@Component({
  selector: 'account-settings-container',
  standalone: true,
  imports: [CommonModule, SettingsUiComponent, LetDirective, UiIndicatorsLoaderComponent],
  templateUrl: './settings-container.component.html',
  styleUrl: './settings-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsContainerComponent {
  private readonly userFacade = inject(UserFacade);
  private readonly agencyFacade = inject(AgencyFacade);
  public readonly userVM$: Observable<UserVM | null> = this.userFacade.user$.pipe(
    map((user: UserEntity | null) => {
      if (!user) {
        return null;
      }
      return {
        username: user.username,
        email: user.email,
      };
    })
  );
  public readonly agencyVM$: Observable<AgencyVM | null> = this.agencyFacade.agency$.pipe(
    map((agency: AgencyEntity | null) => agencyEntityVMAdapter.entityToVM(agency))
  );

  constructor(private readonly title: Title) {
    title.setTitle('Настройки');
  }
}
