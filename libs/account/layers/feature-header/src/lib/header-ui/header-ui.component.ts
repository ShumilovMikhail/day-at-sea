import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface AgencyVM {
  id: number | string;
  name: string;
  photo?: string;
}

@Component({
  selector: 'account-header-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-ui.component.html',
  styleUrl: './header-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUiComponent {
  @Output() menuButtonEvent = new EventEmitter<boolean>();
  @Input({ required: true }) agencyVM!: AgencyVM | null;
  public mobileButtonActive = false;

  public onMenuButtonClick(): void {
    this.mobileButtonActive = !this.mobileButtonActive;
    this.menuButtonEvent.emit(this.mobileButtonActive);
  }
}
