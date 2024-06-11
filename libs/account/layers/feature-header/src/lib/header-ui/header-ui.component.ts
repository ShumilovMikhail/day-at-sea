import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface UserVM {
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
  @Output() menuButtonEvent = new EventEmitter<void>();
  @Input({ required: true }) userVM!: UserVM;

  public onMenuButtonClick(): void {
    this.menuButtonEvent.emit();
  }
}
