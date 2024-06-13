import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyVM, UserVM } from '../types/settings.models';

@Component({
  selector: 'account-settings-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-ui.component.html',
  styleUrl: './settings-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsUiComponent {
  @Input({ required: true }) userVM!: UserVM;
  @Input({ required: true }) agencyVM!: AgencyVM;
}
