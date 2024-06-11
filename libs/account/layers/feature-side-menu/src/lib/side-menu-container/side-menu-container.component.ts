import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { Observable } from 'rxjs';

import { SideMenuUiComponent } from '../side-menu-ui/side-menu-ui.component';
import { UserEntity, UserFacade } from '@user/data-access';

@Component({
  selector: 'account-side-menu-container',
  standalone: true,
  imports: [CommonModule, SideMenuUiComponent, LetDirective],
  templateUrl: './side-menu-container.component.html',
  styleUrl: './side-menu-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuContainerComponent {
  private readonly userFacade = inject(UserFacade);
  public readonly user$: Observable<UserEntity | null> = this.userFacade.user$;
}
