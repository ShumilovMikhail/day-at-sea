import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Observable, take } from 'rxjs';

import { AuthFacade, UserEntity, UserFacadeSignal } from '@auth/data-access';
import { HeaderContainerComponent } from '@account/layers/header';
import { SideMenuContainerComponent } from '@account/layers/side-menu';
import { AgencyFacade } from '@account/data-access-agency';
import { FeatureNotificationsComponent } from '@notifications/feature-notifications';
import { toObservable } from '@angular/core/rxjs-interop';

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
  private readonly userFacade = inject(UserFacadeSignal);
  private readonly user$: Observable<UserEntity | null> = toObservable(this.userFacade.user$);
  public readonly agencyFacade = inject(AgencyFacade);
  public readonly router = inject(Router);
  public isSideMenuMobileOpen: WritableSignal<boolean> = signal(false);
  public userExist: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.authFacade.init();
    this.user$
      .pipe(
        filter((user: UserEntity | null) => Boolean(user)),
        take(1)
      )
      .subscribe((user) => {
        this.agencyFacade.init(user!.id);
      });
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
