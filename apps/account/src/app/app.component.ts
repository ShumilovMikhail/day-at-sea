import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { AuthFacade, UserFacade } from '@auth/data-access';
import { HeaderContainerComponent } from '@account/layers/header';
import { SideMenuContainerComponent } from '@account/layers/side-menu';
import { AgencyFacade } from '@account/data-access-agency';
import { FeatureNotificationsComponent } from '@notifications/feature-notifications';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderContainerComponent, SideMenuContainerComponent, FeatureNotificationsComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly authFacade = inject(AuthFacade);
  private readonly userFacade = inject(UserFacade);
  public readonly agencyFacade = inject(AgencyFacade);
  public readonly router = inject(Router);
  public isSideMenuMobileOpen: WritableSignal<boolean> = signal(false);
  public userExist: WritableSignal<boolean> = signal(false);
  private readonly userEffect = effect(() => {
    const user = this.userFacade.user();
    if (user) {
      this.userEffect.destroy();
      untracked(() => {
        this.agencyFacade.init(user!.id);
      });
    }
  });

  ngOnInit(): void {
    this.authFacade.init();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isSideMenuMobileOpen.set(false);
      }
    });
  }

  public onSideMenuMobileToggle(isMobileOpen: boolean) {
    this.isSideMenuMobileOpen.set(isMobileOpen);
  }
}
