import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { Observable } from 'rxjs';

import { SideMenuUiComponent } from '../side-menu-ui/side-menu-ui.component';
import { SideMenuMobileDirective } from '../directives/side-menu-mobile.directive';
import { FirstNamePipe } from '@utils/pipes';
import { AgencyEntity, AgencyFacade } from '@account/data-access-agency';

@Component({
  selector: 'account-side-menu-container',
  standalone: true,
  imports: [
    CommonModule,
    SideMenuUiComponent,
    LetDirective,
    SideMenuMobileDirective,
    FirstNamePipe,
  ],
  templateUrl: './side-menu-container.component.html',
  styleUrl: './side-menu-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuContainerComponent {
  @Input({ required: true }) isMobileOpen!: boolean;
  private readonly agencyFacade = inject(AgencyFacade);
  public readonly agency$: Observable<AgencyEntity | null> =
    this.agencyFacade.agency$;
}
