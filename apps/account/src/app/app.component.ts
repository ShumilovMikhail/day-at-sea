import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, take } from 'rxjs';

import { AuthFacadeSignal, UserEntity, UserFacade } from '@auth/data-access';
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
  private readonly authFacade = inject(AuthFacadeSignal);
  private readonly userFacade = inject(UserFacade);
  public readonly agencyFacade = inject(AgencyFacade);
  public readonly router = inject(Router);
  public isSideMenuMobileOpen = false;
  public userExist = false;

  ngOnInit(): void {
    this.authFacade.init();
    this.userFacade.user$
      .pipe(
        filter((user: UserEntity | null) => Boolean(user)),
        take(1)
      )
      .subscribe((user) => {
        this.agencyFacade.init(user!.id);
      });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isSideMenuMobileOpen = false;
      }
    });
  }

  public onSideMenuMobileToggle(isMobileOpen: boolean) {
    this.isSideMenuMobileOpen = isMobileOpen;
  }
}
