import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { Title } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';

import { SettingsUiComponent } from '../settings-ui/settings-ui.component';
import { UserFacade } from '@auth/data-access';
import { AgencyEntity, AgencyFacade } from '@account/data-access-agency';
import { AgencyVM, UserVM } from '../types/settings.models';
import { UiIndicatorsLoaderComponent } from '@ui/indicators';
import { agencyEntityVMAdapter } from './agency-entity-vm.adapter';
import { toSignal } from '@angular/core/rxjs-interop';

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
  public readonly userVM: Signal<UserVM | null> = computed(() => {
    const user = this.userFacade.user();
    if (!user) {
      return null;
    }
    return {
      username: user.username,
      email: user.email,
    };
  });
  private readonly agencyVM$: Observable<AgencyVM | null> = this.agencyFacade.agency$.pipe(
    map((agency: AgencyEntity | null) => agencyEntityVMAdapter.entityToVM(agency))
  );
  public readonly agencyVM = toSignal(this.agencyVM$);

  constructor(private readonly title: Title) {
    title.setTitle('Настройки');
  }
}
