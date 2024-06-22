import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account-auth-edit-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-edit-ui.component.html',
  styleUrl: './auth-edit-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthEditUiComponent {
  @Output() backEvent = new EventEmitter<void>();

  public onBack(): void {
    this.backEvent.emit();
  }
}
