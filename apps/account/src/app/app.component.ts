import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, take } from 'rxjs';

import { AuthFacade, UserEntity } from '@auth/data-access';
import { HeaderContainerComponent } from '@account/layers/header';
import { SideMenuContainerComponent } from '@account/layers/side-menu';
import { AgencyFacade } from '@account/data-access-agency';
import { StorageFacade } from '@storage/data-access-storage';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderContainerComponent, SideMenuContainerComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly authFacade = inject(AuthFacade);
  private readonly storageFacade = inject(StorageFacade);
  public readonly agencyFacade = inject(AgencyFacade);
  public readonly router = inject(Router);
  public isSideMenuMobileOpen = false;
  public userExist = false;

  ngOnInit(): void {
    this.authFacade.init();
    this.authFacade.user$
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
