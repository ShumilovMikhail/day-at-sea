import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { Observable, filter } from 'rxjs';

import { SideMenuUiComponent } from '../side-menu-ui/side-menu-ui.component';
import { SideMenuMobileDirective } from '../directives/side-menu-mobile.directive';
import { FirstNamePipe } from '@utils/pipes';
import { AgencyEntity, AgencyFacade } from '@account/data-access-agency';
import { UiAddObjectSideMenuComponent } from '@account/add-object/ui-side-menu';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'account-side-menu-container',
  standalone: true,
  imports: [
    CommonModule,
    SideMenuUiComponent,
    LetDirective,
    SideMenuMobileDirective,
    FirstNamePipe,
    UiAddObjectSideMenuComponent,
  ],
  templateUrl: './side-menu-container.component.html',
  styleUrl: './side-menu-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuContainerComponent implements OnInit {
  @Input({ required: true }) isMobileOpen!: boolean;
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly agencyFacade = inject(AgencyFacade);
  public readonly agency$: Observable<AgencyEntity | null> = this.agencyFacade.agency$;
  public url = this.location.path();

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.url = event.urlAfterRedirects;
        this.changeDetectorRef.detectChanges();
      });
  }
}
