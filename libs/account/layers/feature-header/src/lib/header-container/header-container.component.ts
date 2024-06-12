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
import { FirstNamePipe } from '@utils/pipes';
import { AgencyEntity, AgencyFacade } from '@agency/data-access';

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
  private readonly agencyFacade = inject(AgencyFacade);
  public readonly agency$: Observable<AgencyEntity | null> =
    this.agencyFacade.agency$;

  public onMenuToggle(isMobileOpen: boolean): void {
    this.menuOpenEvent.emit(isMobileOpen);
  }
}
