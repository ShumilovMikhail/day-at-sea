import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { Observable } from 'rxjs';

import { HeaderUiComponent } from '../header-ui/header-ui.component';
import { UserEntity, UserFacade } from '@user/data-access';
import { FirstNamePipe } from '@utils/pipes';

@Component({
  selector: 'account-header-container',
  standalone: true,
  imports: [CommonModule, HeaderUiComponent, LetDirective, FirstNamePipe],
  templateUrl: './header-container.component.html',
  styleUrl: './header-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderContainerComponent {
  @Output() menuOpenEvent = new EventEmitter<boolean>();
  private readonly userFacade = inject(UserFacade);
  public readonly user$: Observable<UserEntity | null> = this.userFacade.user$;

  public onMenuToggle(isMobileOpen: boolean): void {
    this.menuOpenEvent.emit(isMobileOpen);
  }
}
