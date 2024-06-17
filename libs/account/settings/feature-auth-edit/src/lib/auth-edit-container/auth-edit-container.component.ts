import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { AuthEditUiComponent } from '../auth-edit-ui/auth-edit-ui.component';

@Component({
  selector: 'account-auth-edit-container',
  standalone: true,
  imports: [CommonModule, AuthEditUiComponent],
  templateUrl: './auth-edit-container.component.html',
  styleUrl: './auth-edit-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthEditContainerComponent {
  constructor(title: Title) {
    title.setTitle('Настройки');
  }
}
