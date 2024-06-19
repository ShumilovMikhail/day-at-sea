import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { Observable } from 'rxjs';

import { HeaderUiComponent } from '../header-ui/header-ui.component';
import { FirstNamePipe } from '@utils/pipes';
import { AgencyEntity, AgencyFacade } from '@account/data-access-agency';

@Component({
  selector: 'account-header-container',
  standalone: true,
  imports: [CommonModule, HeaderUiComponent, LetDirective, FirstNamePipe],
  templateUrl: './header-container.component.html',
  styleUrl: './header-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderContainerComponent {
  @Input({ required: true }) isMobileButtonActive!: boolean;
  @Output() menuOpenEvent = new EventEmitter<boolean>();
  private readonly agencyFacade = inject(AgencyFacade);
  public readonly agency$: Observable<AgencyEntity | null> = this.agencyFacade.agency$;

  public onMenuToggle(isMobileOpen: boolean): void {
    this.menuOpenEvent.emit(isMobileOpen);
  }
}
