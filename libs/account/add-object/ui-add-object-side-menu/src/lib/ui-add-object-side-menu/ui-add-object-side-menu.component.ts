import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'account-ui-add-object-side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ui-add-object-side-menu.component.html',
  styleUrl: './ui-add-object-side-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAddObjectSideMenuComponent {
  @Output() backButtonClickEvent = new EventEmitter<void>();

  public onBackButtonClick(): void {
    this.backButtonClickEvent.emit();
  }
}
