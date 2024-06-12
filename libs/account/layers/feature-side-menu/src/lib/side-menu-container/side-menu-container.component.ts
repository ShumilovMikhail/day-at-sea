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
import { UserEntity, UserFacade } from '@user/data-access';
import { SideMenuMobileDirective } from '../directives/side-menu-mobile.directive';

@Component({
  selector: 'account-side-menu-container',
  standalone: true,
  imports: [
    CommonModule,
    SideMenuUiComponent,
    LetDirective,
    SideMenuMobileDirective,
  ],
  templateUrl: './side-menu-container.component.html',
  styleUrl: './side-menu-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuContainerComponent {
  @Input({ required: true }) isMobileOpen!: boolean;
  private readonly userFacade = inject(UserFacade);
  public readonly user$: Observable<UserEntity | null> = this.userFacade.user$;
}
