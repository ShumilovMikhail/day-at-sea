import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

interface AgencyVM {
  id: number | string;
  name: string;
  logo?: string | null;
}

@Component({
  selector: 'account-header-ui',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './header-ui.component.html',
  styleUrl: './header-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUiComponent {
  @Output() menuButtonEvent = new EventEmitter<boolean>();
  @Input({ required: true }) agencyVM!: AgencyVM | null;
  @Input({ required: true }) isMobileButtonActive!: boolean;

  public onMenuButtonClick(): void {
    this.menuButtonEvent.emit(!this.isMobileButtonActive);
  }
}
